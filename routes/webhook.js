var express = require('express');
const request = require('request-promise')
var router = express.Router();
var token = "IEl91F7L1MnAuHDD3kxAYgF27xXSQJW41LpAoLMf0RjuuXNBjuN5E2uhYRHPyqcUKjRSgdwWconYrYivZLmyk/ECjXV+pNwjgQQoji+ZNs1wtUwwzkz3xMOjqbabRexZUCt2vbadhK7UwZkxBs9R+gdB04t89/1O/w1cDnyilFU="
var dialogflow_api = "https://bots.dialogflow.com/line/81523972-407b-4542-9d91-539f4cc95baa/webhook"

const line_reply = (req,messages) => {
    return request({
        method: "POST",
        uri: "https://api.line.me/v2/bot/message/reply",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: messages
        })
    });
};

const postToDialogflow = req => {
    req.headers.host = "bots.dialogflow.com";
    return request({
        method: "POST",
        uri: dialogflow_api,
        headers: req.headers,
        body: JSON.stringify(req.body)
    });
    
};

router.post('/', function (req, res, next) {   
    event = req.body.events[0];
    if (event.message.type == "text") {       
        console.log(postToDialogflow(req))      
    }
    return res.status(200).send(req.method);

});
module.exports = router;