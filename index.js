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

router.listen(port, () => {
    console.log(`Server -`, port)
})