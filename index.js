import { log } from 'console'
import express from 'express'
import nodemailer from 'nodemailer'
const app = express()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jgungun659@gmail.com',
        pass: 'tjop njtj qwly sdlc'
    },
    tls: {
        rejectUnauthorized: false
    }
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.get('/email', (req, res) => {
    res.render('mail')
})
app.post('/submit-email', (req, res) => {
    const data = req.body
    log(data)

    const mailOption = {
        from: 'jgungun659@gmail.com',
        to: 'jgungun659@gmail.com',
        subject: req.body.subject,
        text: req.body.mail
    }
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Email operation failed, try again')

        }
        console.log("Mail sent:", info.response)
        return res.send('Mail sent successfully')
    })

})

app.listen(3200)
