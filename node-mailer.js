const nodemailer = require("nodemailer");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// console.log(transporter)

async function sendEmail(email, subject, text) {

    // var testAccount = await nodemailer.createTestAccount();

    var transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'bilalsheikh2500@gmail.com', // generated ethereal user
            pass: '', // generated ethereal password
        },
    });

    var info = await transporter.sendMail({
        from: email, // sender address
        to: "pakistaniprogrammer@gmail.com", // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: "<b>Thanks Bilal Ahmad</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

}

sendEmail("bilalsheikh2500@gmail.com","node mailer","Hello!!! this email is generated from node mailer");