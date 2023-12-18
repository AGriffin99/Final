Microsoft Azure Text to Speech

The Text to Speech functionality allows applications to become more accessible. It enables the tools, applications, or devices to convert text into automated humanlike speech, similar to that of siri, alexa, or google assistants. There are usages of prebuilt neural voices as well as custom voices, but for my implementation I used a prebuilt voice. For more documentation and information on this resource please refer to: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech

**How to use**
To use this resource you will need to create a speech resource within the Azure portal. You can either have a paid or free subscription, with that you will be able to receive a Speech resource key and region to use with the resource you have deployed. With the key and region you will be able to specify your request links for your region and be acknowledged of your usage.


**API Details**
The Text To Speech Service has 2 primary API endpoints that I am utilizing. Below are the descriptions of the endpoints and their required parameters.

**/docs/list**
Description: To get a list of all available voices for the east us region.
Ocp-Apim-Subscription-Key: 'Your-apiKey' or Authorization: Bearer 'token'


**docs/textToSpeech**
Ocp-Apim-Subscription-Key: 'Your-apiKey' or Authorization: Bearer 'token'
X-Microsoft-OutputFormat: riff-24khz-16bit-mono-pcm
Content-Type:application/ssml+xml
Body: 
<speak version='1.0' xml:lang='en-US'> <voice xml:lang='en-US' xml:gender='Female'
    name='en-US-JennyNeural'>
        {Message of your choice}
</voice></speak>
