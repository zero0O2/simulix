import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECT)
.then(() => console.log('Conectado ao MongoDB'))    
.catch((error) => console.log(error));


const UserSchema = new Schema({
    avatar:{type : String, required : true, default : 'https://i.pinimg.com/736x/bd/c7/81/bdc781b471ebd825a6ab5a40e36e0f8e.jpg'},
    name:{type : String, required : true},
    email:{type : String, required : true, unique : true},
    password:{type : String, minlength: 8, required : true, select: false},
    role:{type : String, required : true, default : 'user'},
},{timestamps : true}) 

const User = model('User', UserSchema)

const OptionSchema = new Schema({
    
    id: {
        type: Number,
        required: true,
    },

    text: {
        type: String,
        required: true
    },

    correct: {
        type: Boolean,
        required: true,
        default: false
    }

}, { _id: false })



const QuestionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        trim: true
    },

    subject: {
        type: String,
        required: true,
        trim: true
    },

    examType: {
        type: String,
        required: true,
        enum: [
            "ENEM",
            "UECE",
            "Faculdade",
            "Cursinho",
            "Outro"
        ]
    },

    question: {
        type: String,
        required: true
    },

    options: {
        type: [OptionSchema],
        validate: {
            validator: (value) => value.length >= 2,
            message: "A questão deve possuir pelo menos 2 alternativas"
        }
    },

    explanation: {
        type: String,
        default: ""
    },

    tags: {
        type: [String],
        default: []
    }

}, {
    timestamps: true
})

const Question = model('Question', QuestionSchema)


// ============== Login e cadastro de usuários =================

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

app.get('/authorization', async (req, res) => {

    const bearer = req.headers.authorization

    if(!bearer){
        return res.status(401).json({message: 'Token não fornecido'})
    }

    const tokenJwt = bearer?.split(' ')[1]

    if(!tokenJwt){
        return res.status(401).json({message: 'Token mal formatado'})
    }
    
    const token = jwt.verify(tokenJwt, process.env.JWT_SECRET)

    try {
        res.json(token)
    } catch (error) {
        res.json(error)
    }
})

app.post('/login', async (req, res) => {

    const {email, password} = req.body

    const erros = {}
   
    if(!email){
        erros.email = 'Campo de email é obrigatório'
    }
    if(!password){
        erros.password = 'Campo de senha é obrigatório '
    }

    const errosLength = Object.keys(erros).length

    if(errosLength > 0){
        return res.status(400).json({erros})
    }

    try {
        const user = await User.findOne({email}).select('+password')

        
        if(!user){
            return res.status(400).json({message: 'Email ou senha incorretos'})
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            return res.status(400).json({message: 'Email ou senha incorretos'})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '2d'}) 

        res.json({token})

    } catch (error) {
        res.status(404).json({message: error})
    }
});

app.post('/cadastro', async (req, res) => {
    const {name, email, password, passwordConfirm} = req.body
    const erros = {}
   
    if(!name){
        erros.name = 'Campo de nome é obrigatório'
    }
    if(!email){
        erros.email = 'Campo de email é obrigatório'
    }
    if(!password || password.length < 8){
        erros.password = 'Campo de senha é obrigatório e deve ter pelo menos 8 caracteres'
    }
    if(password !== passwordConfirm){
        erros.passwordConfirm = 'As senhas não coincidem'
    }

    const errosLength = Object.keys(erros).length
    
    if(errosLength > 0){
        return res.status(400).json({erros})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const UsersFormDados = {name, email, password:hashedPassword}

    try {
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: 'Email já cadastrado'})
        }

        const userCreated = await User.create(UsersFormDados)

        res.json(userCreated)
    } catch (error) {
        return res.status(400).json(error)
    }
});

app.post('/questions', async (req, res) => {
    let userId = null
    
    try {
        const bearer = req.headers.authorization
        if (!bearer) {
            return res.status(401).json({ message: 'Token não fornecido' })
        }
        const tokenJwt = bearer.split(' ')[1]

        if (!tokenJwt) {
            return res.status(401).json({ message: 'Token mal formatado' })
        }

        const token = jwt.verify(tokenJwt, process.env.JWT_SECRET)

        userId = token.id

    } catch (error) {
        res.status(400).json(error)
    }
    
    const {title, subject, examType, question, options, explanation, tags} = req.body
    
    if(!subject || !examType || !question || !options){
        return res.status(400).json({message: 'Campos obrigatórios não fornecidos'})
    }

    const questionData = {
        userId,
        title,
        subject,
        examType,
        question,
        options,
        explanation,
        tags
    }

    try {
        const questionCreated = await Question.create(questionData)
        res.json(questionCreated)
    } catch (error) {
        res.status(404).json(error)
    }

})


app.get('/questions/:userId', async (req, res) => {
    const {userId} = req.params

    try {
        if(!userId){return res.status(404).json({message: 'Usuário não encontrado'})}
        
        const user = await User.findById(userId)
        
        if(!user){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }
        
        const questions = await Question.find({userId})
        
        res.json(questions)
    } catch (error) {
        res.status(404).json(error)
    }
    
})


app.post('/formatOptions/:correct', async (req, res) => {
    const options = req.body
    const correct = parseInt(req.params.correct)
    
    try {
        const optionsid = options.map((e,index) => ( { text:e , id:index + 1 } ) )
        const optionsWithoutEmpty = optionsid.filter(option => option && option.text.trim() !== '')
        
        if(!optionsWithoutEmpty || optionsWithoutEmpty.length === 0){
            return res.status(400).json({message: 'Opções não fornecidas'})
        }
        
        if(optionsWithoutEmpty.length > 5 || optionsWithoutEmpty.length < 2){
            return res.status(400).json({message: 'Opções devem ter no máximo 5 e no minimo 2 alternativas'})
        }
        
        if(!correct){
            return res.status(400).json({message: 'Correta não fornecida'})
        }
        
        if(!optionsWithoutEmpty.some((e,index) => e.id === correct )){
            return res.status(400).json({message: 'A opção correta deve estar entre as opções fornecidas'})
        }

        const optionsFormated = optionsWithoutEmpty.map((option, index) => (
            {
                id:index + 1,
                text:option.text,
                correct:option.id === correct ? true : false
            }
        ))
        
        res.json(optionsFormated)
    } catch (error) {
        res.status(400).json(error)
    }
    
})

app.delete('/questions/:questionId', async (req, res) => {
    let userId = null
    const idQuestion = req.params.questionId

    try {
        const bearer = req.headers.authorization
        if (!bearer) {
            return res.status(401).json({ message: 'Token não fornecido' })
        }
        const tokenJwt = bearer.split(' ')[1]
        
        if (!tokenJwt) {
            return res.status(401).json({ message: 'Token mal formatado' })
        }
        
        const token = jwt.verify(tokenJwt, process.env.JWT_SECRET)
        
        userId = token

    } catch (error) {
        res.status(400).json(error)
    }
    
    
    try {
        const question = await Question.findById(idQuestion).populate('userId')

        if(!question){
            return res.status(404).json({message: 'Questão não encontrada'})
        }

        const userQuestion = await User.findById(question.userId)

        if(userQuestion._id.toString() !== userId.id){
            return res.status(403).json({message: 'A questão não pertence ao usuário'})
        }

        await Question.findByIdAndDelete(idQuestion)

        res.json({message: 'Questão deletada com sucesso'})

    } catch (error) {
        res.status(404).json(error)
    }

})

app.post("/gabaritoInfos", async (req,res) => {
    const gabaritoArray = req.body

    try {
        const questoesBanco = await Question.find()
        const gabaritoIdArray = gabaritoArray.map(gabarito => gabarito.id)

        if(!gabaritoIdArray){return res.status(404).json({message:"Gabarito não encontrado"})}
        
        const questoesInGabarito = questoesBanco.filter(questao => {
            return gabaritoIdArray.includes(questao._id.toString())
        })

        if(!questoesInGabarito > 0){return res.status(404).json({message:"Nenhuma Questao encontrada"})}

        const desempenho = questoesInGabarito.map(questao => {
            const correct = questao.options.find(option => option.correct === true)
            const gabaritoForQuest = gabaritoArray.find(e => e.id === questao._id.toString())
            const isCorrect = correct.id === gabaritoForQuest.check

            return {
                id:questao._id,
                isCorrect,
                optionCheck:gabaritoForQuest.check,
                optionCorrect:correct.id
            }
        })

        const correctCount = desempenho.filter(e =>  e.isCorrect === true).length
        const incorrectCount = desempenho.filter(e =>  e.isCorrect === false).length

        res.json({desempenho,correctCount,incorrectCount})
        
    } catch (error) {
        res.json(error) 
        
    }

})



app.listen(PORT, () => {
    console.log(`Servidor escutando na porta http://localhost:${PORT}`);
});