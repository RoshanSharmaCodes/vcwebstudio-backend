const express = require('express');
const mailRouter = express.Router();
const nodemailer = require('nodemailer');

mailRouter.get('/', (req, res) => {
    console.log("Req")
    res.send('Mail route is working!');
});

mailRouter.post("/sendmail", async (req, res) => {
    const requestBody = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: '',
        },
    });

   if (!requestBody.message || requestBody.message == "") {
        res.status(400).json({ ErrorCode: "E01", Message: "Missing Email Body" })
        return;
}

    const mailOptions = {
        from: 'VCWebStudio Team support@vcwebstudio.tech',
        to: ["sushrut@vcmedialabs.com","roshan.rks2812000@gmail.com", requestBody.email],
        text: requestBody.message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        if(info){
            const mailSendToClient = {
                from: 'VCWebStudio Team roshan.rks2812000@gmail.com',
                to: requestBody.email,
                subject: "Thank You for Your Inquiry",
                html: `<p>Dear ${requestBody.name},</p><p>Thank you for reaching out to us. We have received your query and appreciate your interest in our services.
                <br/>
                Our team is currently reviewing your request and will get back to you shortly with more information.
                <br/>
                In the meantime, if you have any urgent questions or concerns, feel free to reach out to us at sales@vcwebstudio.tech.
                <br/>
                <br/>
                Thank you for considering us, and we look forward to the opportunity to assist you further.</p><br/><p>Best regards,<br/>Team VCWebStudio.</p>`,
            };
            const info = await transporter.sendMail(mailSendToClient);
        }

        res.status(200).json({ErrorCode:"E00",Message:'Email sent successfully!'});
    } catch (error) {
        console.error('Error sending email: ', error.message);

        res.status(500).send('Internal Server Error');
    }
})


module.exports = mailRouter;