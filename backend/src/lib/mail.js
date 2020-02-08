import nodemailer from 'nodemailer';
import expHbs from 'express-handlebars';
import nodeMailerHbs from 'nodemailer-express-handlebars';

import mailConf from '../config/mail';
import { resolve } from 'path';

class Mail {
    constructor() {
        const { host, port, secure, auth } = mailConf;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });

        this.configureTemplates();
    }

    configureTemplates() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

        this.transporter.use('compile', nodeMailerHbs({
            viewEngine: expHbs.create({
                layoutsDir: resolve(viewPath, 'layouts'),
                partialsDir: resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs',
            }),
            viewPath,
            extName: '.hbs'
        }))
    }

    sendMail(message) {
        return this.transporter.sendMail({ ...mailConf.default, ...message });
    }
}

export default new Mail();