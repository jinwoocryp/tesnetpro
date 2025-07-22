
const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static(__dirname)); // serve everything from current directory
app.use(bodyparser.urlencoded({extended :true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
     console.log("Serving:", __dirname + "/index.html");
});

app.post("/",function(req,res){
    const comm = req.body.message;
    const na = req.body.nameofperson;
    const toEmail = req.body.username;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'ashfahunofficial@gmail.com',
            pass:'fsbn eqfu oaug cmex'   //fake passwords

        }
});
const mailOptions ={
    from:'ashfahunofficial@gmail.com',
     to: toEmail,
    cc:'ashfahunofficial@gmail.com',
    subject:'thanks for giving feedback'  +na,
    text:'thanks for your message you have sent to us -->' + comm +'"'
};

transporter.sendMail(mailOptions, function(error,info){
    if(error){
        console.log(error);

    }else{
        res.send("mail submit");
        console.log("email sent" +info.response);
    }
});

});
app.listen(3000, function() {
    console.log("Server started at port 3000");
});