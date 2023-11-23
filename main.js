import express from "express"
import backRouter from "./servidor/server.js"

const app = express()

// Frontend
app.use(express.static('cliente'))

// Backend
app.use(backRouter)

// localhost:3000/songs

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

