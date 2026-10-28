import express from "express"

const router = express()
const port = 1331

let turmas = [
    {id: 1, nome: "JavaScript - Manhã", sala: "Lab 1"},
    {id: 2, nome: "JavaScript - Noite", sala: "Lab 2"}
]

let alunos = [
    {id: 1, nome: "Ana", idade: 17},
    {id: 2, nome: "Bruno", idade: 19}
]

router.use(express.json())

function registrarLog(req, res, next){
    console.log(`${req.method} - ${req.url}`)
    next()
}

router.use(registrarLog)

router.get("/turmas", (req, res) => {
    res.send(turmas)
})

router.get("/alunos", (req, res) => {
    res.send(alunos)
})

router.get("/alunos/:id", (req, res) => {
    const id = Number(req.params.id)
    const indice = alunos.findIndex((aluno) => aluno.id === id)
    if(indice === -1){
       return res.status(404).send({erro: "Aluno não encontrado!"})
    }else{
    res.send(alunos[indice])
    }
})

function validarTurma(req,res,next){
    if(!req.body.nome || !req.body.sala || req.body.sala === "" || req.body.nome === ""){
        return res.status(400).send({erro: "As informações estão faltando ou incorretas!"})
    }
    next()
}

function verificarSala(req, res, next){
    const indice = turmas.findIndex((turma) => turma.sala === req.body.sala)

    if(indice !== -1){
        return res.status(409).send({ erro:"Essa sala já está em uso!"})
    }
    next()
}

router.post("/turmas", validarTurma, verificarSala, (req, res) => {
    let nome = req.body.nome
    let sala = req.body.sala

    let id = 1
    if(turmas.length > 0){
        id = turmas[turmas.length-1].id + 1
    }

    let turma = {id: id, nome: nome, sala: sala}
    turmas.push(turma)
    res.status(201).send({mensagem: "Turma criada com sucesso!"})
})

function validarAluno(req,res,next){
    if(!req.body.nome || !req.body.idade || req.body.sala === ""){
        return res.status(400).send({erro: "As informações estão faltando ou incorretas!"})
    }
    next()
}

function validarIdade(req, res, next){
    if(req.body.idade < 14 || isNaN(req.body.idade)){
        return res.status(200).send({erro: "Idade mínima: 14 anos" })
    }
    next()
}

router.post("/alunos", validarAluno, validarIdade, (req, res) => {
    let nome = req.body.nome
    let idade = req.body.idade

    let id = 1
    if(alunos.length > 0){
        id = alunos[alunos.length-1].id + 1
    }

    let aluno = {id: id, nome: nome, idade: idade}
    alunos.push(aluno)
    res.status(201).send({mensagem: "Aluno matriculado com sucesso!"})
})

function validarSenha(req,res,next){
    if(req.headers.senha !== "coordenacao"){
        return res.status(401).send({erro: "Acesso negado!"})
    }
    next()
}

router.delete("/turmas/:id", validarSenha, (req,res) => {
    const id = Number(req.params.id)
    const indice = turmas.findIndex((turma) => turma.id === id)
    if(indice === -1){
       return res.status(404).send({erro: "Turma não encontrada!"})
    }else{
    turmas.splice(indice, 1)
    res.send({mensagem: "Turma apagada com sucesso!"})
    }
})

router.listen(port, () => {
    console.log(`Server -`, port)
})