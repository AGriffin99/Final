const express = require('express');
const app = express();
const port = 3000;
const mariadb = require('mariadb');
const cors = require('cors');

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
            // servers: ['http://localhost:3000', 'http://206.81.3.222:3000/']
        }
    },
}
//list of voices
app.get('/list', async (req, res) => {
    // https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/rest-text-to-speech?tabs=streaming#authentication
    let conn;
    try {

        conn = await pool.getConnection();
        var query = "INSERT INTO agents VALUES (agent_code, agent_name, working_area, commission, phone_no, country)";
        var rows = await conn.query(query, [agents.agent_code, agents.agent_name, agents.working_area, agents.commission, agents.phone_no, agents.country]);
        res.json(rows)
    }
    catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
})
//convert text to speech
app.post('/textToSpeech', async (req, res) => {
    // https://eastus.tts.speech.microsoft.com/cognitiveservices/v1
    let conn;
    try {

        conn = await pool.getConnection();
        var query = "INSERT INTO agents VALUES (agent_code, agent_name, working_area, commission, phone_no, country)";
        var rows = await conn.query(query, [agents.agent_code, agents.agent_name, agents.working_area, agents.commission, agents.phone_no, agents.country]);
        res.json(rows)
    }
    catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
})
//audio outputs
app.post('/agent', async (req, res) => {
    let conn;
    try {

        conn = await pool.getConnection();
        var query = "INSERT INTO agents VALUES (agent_code, agent_name, working_area, commission, phone_no, country)";
        var rows = await conn.query(query, [agents.agent_code, agents.agent_name, agents.working_area, agents.commission, agents.phone_no, agents.country]);
        res.json(rows)
    }
    catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
})