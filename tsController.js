const dotenv = require('dotenv')
dotenv.config()
const sdk = require('microsoft-cognitiveservices-speech-sdk')
const request = require('request')
const audio_file = 'speechoutput.mp3'

const getAudioResponse = async (req, res) => {

    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.API_KEY_SPEECH, process.env.API_SPEECH_REGION)
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audio_file)

    //voice in preferred dialect
    speechConfig.speechSynthesisVoiceName = 'en-JennyNeural'
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig)



    // var request = require('request');
    // var options = {
    //     'method': 'POST',
    //     'url': 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1',
    //     'headers': {
    //         'Content-Type': 'application/ssml+xml',
    //         'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
    //         'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAiOiJKV1QifQ.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiJkMGFlNjJjZWIxZDg0YWYxOTZjOTNhZjFkNWI3ODg4OSIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy9hM2M4ZjZmZS0yMzkyLTQ1ZTItYTY4Yi0xOGI5NWM3OTYwY2UvcmVzb3VyY2VHcm91cHMvdW5jYy9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL2ZpbmFsdGV4dHRvc3BlZWNoIiwic2NvcGUiOiJzcGVlY2hzZXJ2aWNlcyIsImF1ZCI6InVybjptcy5zcGVlY2hzZXJ2aWNlcy5lYXN0dXMiLCJleHAiOjE3MDI4OTQ2MDYsImlzcyI6InVybjptcy5jb2duaXRpdmVzZXJ2aWNlcyJ9.tqaz7Gkv0ihczHi4QtLmv563Ydpj5JPDj2Y6gGHgr4DBBLkVtziWGY7MBmRdA_iB05vPhhXsrR_ChGoxhVlotw'
    //     },
    //     body: '<speak version=\'1.0\' xml:lang=\'en-US\'><voice xml:lang=\'en-US\' xml:gender=\'Male\'\n    name=\'en-US-ChristopherNeural\'>\n        I\'m excited to finish!\n</voice></speak>'

    // };

    // request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);

    // });



    request('/text', async (error, response, body) => {
        const prompt = JSON.parse(body).response
        console.log("prompt:" + prompt);
        //start synthesizer and await results
        synthesizer.speakTextAsync(`${prompt}`, (result) => {
            if (result.reason == sdk.ResultReason.SynthesizingAudioCompleted) res.status(200).json({ message: 'Synthesis finished successfully' });
            else res.status(400).json({ message: { Error: result.errorDetails } })

            synthesizer.close()
            synthesizer = null
        })
        console.log("Now synthesizing to: " + audio_file)
    })
}

module.exports = getAudioResponse