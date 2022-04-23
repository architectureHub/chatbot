const express = require('express')
const bodyParser = require('body-parser')
const request1 = require('request-promise');

const app = express() 
const port = process.env.VCAP_APP_PORT || 5000 
app.use(bodyParser.json()) 


app.post('/test', (req, res) => {
  console.log(req.body)

  res.send({
    replies: [{
      type: 'text',
      content: 'Roger that',
    }], 
    conversation: {
      memory: { key: 'value' }
    }
  })
})


app.post('/welcome', (req, res) => {
  console.log(req.body)

  res.send({
    replies: [{
      type: 'text',
      content: 'Hello Partha',
    }], 
    conversation: {
      memory: { userid: 'partha1',
                userName: "Partha S Goswami" }
    }
  })
})

app.post('/bookcar', (req, res) => {
  console.log(req.body)
  console.log('Inside POST request ------------->>')

  var userName = req.body.conversation.memory.userName.raw;
  var city = req.body.conversation.memory.v_city.raw;
  var carType = req.body.conversation.memory.v_cartype.raw;
  var startDate = req.body.conversation.memory.v_startdate.iso;
  var endDate = req.body.conversation.memory.v_enddate.iso;


// var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://121580b9trial-dev-appteam-sojob-srv.cfapps.us10.hana.ondemand.com/catalog/carBooking',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "carID": "1",
    "customerName": userName,
    "carlocation": city,
    "carType": carType,
    "startDate": startDate,
    "endDate": endDate
  })

};
request1(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

  res.send({
    replies: [{
      type: 'text',
      content: 'Your booking got confirmed!',
    }], 
    conversation: {
      memory: { booking: 'confirmed' }
    }
  })
})


app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 

app.listen(port, () => { 
  console.log('Server is running on port 5000') 
})