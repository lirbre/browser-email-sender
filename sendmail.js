require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// IF YOU WANT TO USE PLEASE MAKE SURE TO READ IT
// config the .env file using your info and that will work.

var corsOptions = {
    origin: "http://localhost:3000"
};
  
app.use(cors(corsOptions));

app.get('/', () => {
    console.log("Welcome to my form");
});

app.post('/sendmail', (req, resp) => {
    let data = req.body;
    console.log(data);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "login",
            user: process.env.REACT_APP_USER,
            pass: process.env.REACT_APP_PASS
        },
    });

    let mailOptions = {
        from: process.env.REACT_APP_USER,
        to: process.env.REACT_APP_RECIEVER,
        subject: 'React Mail Sender',
        text: `${data.text} sent by ${data.name}, using: ${data.email}`,
        html: `
            <h3>Info about user:</h3>
            <ul>
                <li>Sent by: ${data.name}</li>
                <li>The user email is: ${data.email}</li>
            </ul>
            <h3>Message sent:</h3>
            <p>${data.message}</p>
        `
    };

    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.log(`error ${err}`);
        } else {
            console.log(`sucess`)
        };
    });

    return resp.data;
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`Node Server is Running in ${PORT}`)
})