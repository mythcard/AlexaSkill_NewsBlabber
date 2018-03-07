'use strict';

const Alexa = require('alexa-sdk');

const request = require('request');

const APP_ID = 'amzn1.ask.skill.3677d8ab-89b4-41c9-8ba8-e74bf1848593';  // TODO replace with your app ID (OPTIONAL)


const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'News Blabber',
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
        this.emit(':askWithCard', speechOutput, "newsBlabber", speechOutput);
    },
     'getNews': function () {
        const message = "Check to see if the intent is working!";
        const speechOutput = "Please enter the 5 digit pin";
        //this.emit(':tell', message);
        this.emit(':askWithCard', speechOutput, "newsBlabber", speechOutput);
    },
    'getFiveDigitPin': function () {
        var message = "Please Enter your first name";
        
        
        console.log("Event details as follows: ",JSON.stringify(this.event));
        console.log("Context details as follows: ",JSON.stringify(this.context));
        
       // console.log("The number that user input is as follows: ", this.event.request.intent.slots.pinValue.value);
       
       var str1 = "The pin you entered is :"+this.event.request.intent.slots.pinValue.value;
        
       message = str1 + message;
        
        this.emit(':ask', message);
    },
    'getFirstName': function () {
        const message = "Check to see if the first Name is being input!";
        
        
        console.log("Event details as follows: ",JSON.stringify(this.event));
        console.log("Context details as follows: ",JSON.stringify(this.context));
        
       // console.log("The number that user input is as follows: ", this.event.request.intent.slots.pinValue.value);
        
       
        
        this.emit(':ask', message);
    },
     'getLastName': function () {
        const message = "Check to see if the last Name is being input!";
        
        
        console.log("Event details as follows: ",JSON.stringify(this.event));
        console.log("Context details as follows: ",JSON.stringify(this.context));
        
       // console.log("The number that user input is as follows: ", this.event.request.intent.slots.pinValue.value);
        
       
        
        this.emit(':tell', message);
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