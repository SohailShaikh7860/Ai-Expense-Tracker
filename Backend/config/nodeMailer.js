import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transport = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMPT_LOGIN,
        pass: process.env.SMPT_KEY
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 30000,
    pool: true,
    maxConnections: 5,
    maxMessages: 10,
    debug: false,
    logger: false
})

export {
    transport
}