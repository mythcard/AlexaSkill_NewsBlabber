'use strict';

const Alexa = require('alexa-sdk');

const request = require('request');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL)


const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'Space Facts',
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};


const handlers = {
    'LaunchRequest': function () {
        this.emit('sayHi');
    },
    'sayHi': function () {
        const message = "I am told to say hello, as if you are something special! If you want something, I am listening.";
        const speechOutput = message;
        this.emit(':tellWithCard', speechOutput, "newsBlabber", speechOutput);
    },
     'breakingNews': function () {
        
        var url1 = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=380e9f61582d4448b3e26686e4572213';
          
       const options = {  
    url: url1,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

request(options, function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
});
         
         
        const message = "Check the log to see if it is working!";
        const speechOutput = message;
        this.emit(':tellWithCard', speechOutput, "newsBlabber", speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};



exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};