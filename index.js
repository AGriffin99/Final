const express = require('express');
const dotenv = require('dotenv')
const app = express();
const port = 3000;
const cors = require('cors');
const request = require('request')

dotenv.config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {

        info: {
            title: 'Final project',
            description: 'Final Project - Microsoft text to speech api',
            contact: {
                name: 'Anitra Griffin',
            },
            servers: ['https://localhost:3000'],
            schemes: ['https', 'http']
        }
    },
    apis: ['./index.js']

}



app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', require('./tsRoute'));
// app.get('/', (req, res) => {
//     res.render('index')
// })

/**
/**
 * @swagger
 * /list:
 *  get:
 *    description: Use to get a list of available voices
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *      - name: Ocp-Apim-Subscription-Key
 *        in: headers
 *        type: string
 *        required: true
 */
//list of voices
var options = {
    'method': 'GET',
    'url': 'https://eastus.tts.speech.microsoft.com/cognitiveservices/voices/list',
    'headers': {
        'Ocp-Apim-Subscription-Key': process.env.API_KEY_SPEECH
    }
};

app.get('/list', async (req, res) => {
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
    // request('https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/rest-text-to-speech?tabs=streaming#authentication',
    //     async (error, response, body) => {
    //         console.log("prompt:" + prompt);
    //         //start synthesizer and await results
    //         if (!error && response.statusCode == 200) {
    //             console.log(body);
    // }
    // fs.writeFileSync("data.html", body);
    // console.log(req)
    // })
})
/**
/**
 * @swagger
 * /text:
 *  post:
 *    description: Use to synthesize text to speech with default voice
 *    responses:
 *      '200':
 *        description: A successful response
 *  parameters:
 *      - name: Ocp-Apim-Subscription-Key
 *        in: header
 *        required: true
 *        type: string
 *      - name: Content-Type
 *        in: header
 *        required: true
 *        type: string
 *      - name: X-Microsoft-OutputFormat
 *        in: header
 *        required: true
 *        type: string
 *      - name: requestBody
 *        type: string
 *        in: body
 *        required: true    
 */
//convert text to speech
app.post('/text', async (req, res) => {
    // https://eastus.tts.speech.microsoft.com/cognitiveservices/v1

    console.log(req)

    var options1 = {
        'method': 'POST',
        'url': 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1',
        'headers': {
            'Ocp-Apim-Subscription-Key': process.env.API_KEY_SPEECH,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm'
        },
        body: '<speak version=\'1.0\' xml:lang=\'en-US\'><voice xml:lang=\'en-US\' xml:gender=\'Female\'\n    name=\'en-US-JennyNeural\'>\n        I\'m excited to finish!\n</voice></speak>'

    };

    request(options1, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);

    });
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})