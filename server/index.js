const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/send-mail',async(req,resp)=>{
    const {name,email,phone,message} = req.body;
    console.log(process.env.EMAIL);
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_KEY
        }
    });

    const mailOption = {
        from:email,
        to:process.env.EMAIL,
        subject:`New Message from ${name}`,
        text:`Email: ${email}\nPhone:\n${phone}\nMessage:\n${message}`
    };

    try{
       await transporter.sendMail(mailOption);
       resp.send({message:"Email sent successfull"});
    //    console.log("mail sent");
    }catch(e){
        console.log(e);
        resp.status(500).json({message:"Email sending failed!"});
    }
});


app.listen(5000);