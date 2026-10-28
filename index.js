import express from "express"

const router = express()
const port = 1331

router.use(express.json())

function registrarLog(req, res, next){
    console.log(`${req.method} - ${req.url}`)
    next()
}

router.use(registrarLog)

router.link(port, () => {
    console.log(`Server -`, port)
})