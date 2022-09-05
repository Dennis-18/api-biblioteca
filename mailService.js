const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rabinalbilbioteca@gmail.com',
        pass: 'fljgtckmzhozhsrn'
    }
});


// let mailOptions = {
//     from: 'rabinalbilbioteca@gmail.com',
//     to: 'benjamin18105@gmail.com',
//     subject: 'Informacion sobre Prestamo de Libros',
//     text: 'Este es el codigo para el prestamo de tu libro: '
// };

// const enviarMail = 
//     console.log(mailOptions);
    
//     transporter.sendMail(mailOptions, (error, info) => {
//         let response;
//         if(error){
//             console.log('error enviar correo');
//             console.log(error);
//             response = 0;
//             return response;
            
//         }
//         else{
//             response = 1;
//             console.log('email enviado');
//             return response;
//         }
//     })


const enviarMail = (mailOptions) =>{
    // console.log(mailOptions);
    
    transporter.sendMail(mailOptions, (error, info) => {
        let response;
        if(error){
            console.log('error enviar correo');
            console.log(error);
            response = 0;
            return response;
            
        }
        else{
            response = 1;
            // console.log('email enviado' + info.response);
            return response;
        }
    })


} 

module.exports = {
    enviarMail
}