const express = require('express')
const router = express.Router()
const tsControllerText = require('./tsController')


router.get('/textToSpeech', tsControllerText)

module.exports = router