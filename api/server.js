const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://personal-portfolio-rose-alpha-61.vercel.app/'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: 'tmhuynh04@gmail.com',
        pass: 'riadubhvyltjuull'
    },
});

app.post('/api/send-email', async (req, res) => {
        const { email, name, message } = req.body;

        const mailOptions = {
            from: email,
            to: 'tmhuynh04@gmail.com',
            subject: `New Contact Form Message from ${name}`,
            text: `
                Message:
                ${message}
            `,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully'});
});
module.exports = app;
