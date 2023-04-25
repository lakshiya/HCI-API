// +1(833)249-7393
'use strict';
const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const axios = require('axios');
const pantryData = "Pantry operation hours are Tuesdays, 1:00 p.m. until 7:00 p.m.; Wednesdays, 9:00 a.m. until 6:00 p.m.; and Fridays, 9:00 a.m. until 2:00 p.m. And Dont forget to carry your Gator ID card";

process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    function bankingIntent(agent) {

        const banking = agent.parameters.banking;

        if (banking == 'atm') {

            return axios({
                    method: "GET",
                    url: "http://priyalakshmi12.pythonanywhere.com/home/atm/",
                    data: "",
                })
                .then((response) => {
                    var message = response.data.message;
                    console.log("This is a test");
                    console.log(response.data);
                    console.log("End is a test");
                    agent.add(`${message}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (banking == 'banking') {

            return axios({
                    method: "GET",
                    url: "http://priyalakshmi12.pythonanywhere.com/home/banking/",
                    data: "",
                })
                .then((response) => {
                    var message = response.data.message;
                    console.log("This is a test");
                    console.log(response.data);
                    console.log("End is a test");
                    agent.add(`${message}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (banking == 'new account') {

            return axios({
                    method: "GET",
                    url: "http://priyalakshmi12.pythonanywhere.com/home/openaccount/",
                    data: "",
                })
                .then((response) => {
                    var message = response.data.message;
                    console.log("This is a test");
                    console.log(response.data);
                    console.log("End is a test");
                    agent.add(`${message}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }
    // PRIYA - Medical Intent

    function medicalIntent(agent) {

        const health = agent.parameters.health;

        if (health == 'wellness') {

            return axios({
                    method: "GET",
                    url: "http://priyalakshmi12.pythonanywhere.com/home/wellness/",
                    data: "",
                })
                .then((response) => {
                    var message = response.data.message;
                    console.log("This is a test");
                    console.log(response.data);
                    console.log("End is a test");
                    agent.add(`${message}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (health == 'emergency') {

            return axios({
                    method: "GET",
                    url: "http://priyalakshmi12.pythonanywhere.com/home/emergency/",
                    data: "",
                })
                .then((response) => {
                    var message = response.data.message;
                    console.log("This is a test");
                    console.log(response.data);
                    console.log("End is a test");
                    agent.add(`${message}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (health == 'medical') {

            return axios({
                    method: "GET",
                    url: "http://priyalakshmi12.pythonanywhere.com/home/medical/",
                    data: "",
                })
                .then((response) => {
                    var message = response.data.message;
                    console.log("This is a test");
                    console.log(response.data);
                    console.log("End is a test");
                    agent.add(`${message}`);
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }

    //health
    function healthIntent(agent) {
        const health = agent.parameters.health;
        const insurance = agent.parameters.insurance;

        if (health == 'health' && insurance == 'insurance') {
            return axios({
                    method: 'GET',
                    url: 'https://campusmap.ufl.edu/library/cmapjson/health.json',
                    data: '',
                })
                .then((response) => {
                    const json = response.data.features;
                    const info = json[0].properties.DESCRIPTION;

                    console.log('This is a test');
                    agent.add(`This is health info: ${info}`);
                })
                .catch((error) => {
                    console.log(error);
                    agent.add('Sorry, there was an error processing your request.');
                });
        } else {
            agent.add('Sorry, I did not understand your request.');
        }
    }


    //<----code by Abhiram
    function studyRoomIntent(agent) {
        const studyRooms = agent.parameters.studyRooms;
        const details = agent.parameters.details;
        const address = agent.parameters.address;
        if (studyRooms == "study rooms" && address.length > 0) { // Only proceed if user has provided a library name
            return axios({
                    method: "GET",
                    url: "https://campusmap.ufl.edu/library/cmapjson/study.json",
                    data: "",
                })
                .then((response) => {
                    const json = response.data;
                    const locationFeatures = json.features;

                    // Find the feature with NAME property that matches the user input for studyRooms
                    const feature = locationFeatures.filter(x => x.properties.NAME.toLowerCase() == address[0].toLowerCase());
                    console.log("abhi:", feature);
                    if (feature.length > 0) {
                        console.log("entered");
                        const description = feature[0].properties.DESCRIPTION;
                        console.log("in3:", description);
                        agent.add(`There are study rooms available at ${address}.\n${description}`);
                    } else {
                        console.log("No Data");
                        agent.add("There are no study rooms available at this library");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (studyRooms == "study rooms" && Object.keys(address).length == 0) { // Only proceed if user has provided a library name
            return axios({
                    method: "GET",
                    url: "https://campusmap.ufl.edu/library/cmapjson/study.json",
                    data: "",
                })
                .then((response) => {
                    console.log(typeof address);
                    const json = response.data;
                    const locationFeatures = json.features;
                    const detailsArr = [];
                    locationFeatures.forEach(feature => {
                        const name = feature.properties.NAME;
                        detailsArr.push(`${name}, `);
                    });
                    const detailsString = detailsArr.join("\n"); // Join the details array into a string with line breaks
                    agent.add(`You can find study rooms at:\n${detailsString}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }


    }

    //code by Abhiram----->

    //<----code by Shanmukh
    function pantryIntent(agent) {
        console.log("pantry intent");
        const pantry = agent.parameters.pantry;
        const time = agent.parameters.time;

        if (pantry == "pantry" && time == "timings") {
            return agent.add(pantryData);
        }
    }

    //code by Shanmukh----->

    function race(agent) {
        //Here we get the type of the utterance
        const position = agent.parameters.position;
        const query = agent.parameters.query;
        const date = agent.parameters.date;
        const location = agent.parameters.location;

        //Q. who was the first postion in the most recent match?
        if (position == 'champion' && query == 'recent') {
            return axios({
                    method: "GET",
                    url: "http://ergast.com/api/f1/current/last/results.json",
                    data: "",
                })
                .then((response) => {
                    var json = response.data.MRData.RaceTable; //General query for race

                    var name = json.Races[0].Results[0].Driver.givenName;
                    var surname = json.Races[0].Results[0].Driver.familyName;
                    console.log("This is a test");
                    agent.add(`The winner of the most recent race was ${name + " " + surname}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        //Q. who was the last postion in the most recent match?
        else if (position == 'last' && query == 'recent') {
            return axios({
                    method: "GET",
                    url: "http://ergast.com/api/f1/current/last/results.json",
                    data: "",
                })
                .then((response) => {
                    var json = response.data.MRData.RaceTable; //General query for race

                    var name = json.Races[0].Results[19].Driver.givenName;
                    var surname = json.Races[0].Results[19].Driver.familyName;
                    agent.add(`The last position of the most recent race was ${name +" "+ surname}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        //Q. In which location most recent race took place?
        else if (location == 'location') {
            return axios({
                    method: "GET",
                    url: "http://ergast.com/api/f1/current/last/results.json",
                    data: "",
                })
                .then((response) => {
                    var json = response.data.MRData.RaceTable; //General query for race

                    var location = json.Races[0].Circuit.circuitName;
                    agent.add(`The recent race took place at ${location}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Race Intent', race);
    //<---- code by Shanmukh
    // WORKS
    intentMap.set('Pantry Intent', pantryIntent);
    // WORKS
    intentMap.set('StudyRoom Intent', studyRoomIntent);
    //code by Shanmukh ----->
    //health
    intentMap.set('Health Intent', healthIntent);
    // PRIYA
    // WORKS
    intentMap.set('Medical intent', medicalIntent);
    intentMap.set('Banking Intent', bankingIntent);
    agent.handleRequest(intentMap);
});