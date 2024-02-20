const express = require('express')
const router = express.Router()

app.get("/", (req, res) => {
    res.send("Job Detail")
})

module.exports = router