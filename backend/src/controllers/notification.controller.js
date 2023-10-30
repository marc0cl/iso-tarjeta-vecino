const nodemailer = require('nodemailer');
const { MAIL_TOKEN } = require('../config/configEnv')

const sendMail = (mailOptions) => {

    const token = MAIL_TOKEN;
    const mail = 'miguel.castillo1901@alumnos.ubiobio.cl'
    if (!token || token === undefined || token === null){
        console.log('No se ha encontrado el token')
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: mail,
            pass: token
        }  
    })
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
        }
        console.log('Correo enviado correctamente')
    })

    transporter.verify().then(()=>{
        console.log('Servidor habilitado corretamente')
    }).catch(err=>{
        console.log('Error al conectar al servidor')
    })
}

module.exports = {
    sendMail
}

