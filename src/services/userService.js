const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const customerRepository = require('../database/repositories/customerRepository');
const { DateTime } = require('luxon');
const passGenerator = require('generate-password');
const fs = require('fs');
const { compile } = require('handlebars');

const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const path = require('path');

const findOrCreateUserAsync = async (userDTO) => {
    const userExist = await customerRepository.findByEmail({ email: userDTO.email });

    if (userExist) {
        userExist.expire_date = DateTime.utc().plus({ years: 1 }).toJSDate();
        await customerRepository.update(userExist);
        return userExist;
    }
   
    userDTO.uuid = uuidv4();
    /*const passGenerated = passGenerator.generate({ numbers: true, length: 8 });
    console.log(passGenerated);*/

    userDTO.expire_date = DateTime.utc().plus({ years: 1 }).toJSDate();
    userDTO.password = await bcrypt.hash(userDTO.cpf, 10);

    delete userDTO.cpf;
    await customerRepository.save(userDTO);

    return userDTO;
}

const sendEmail = async (user, password) => {
    const transporter = nodemailer.createTransport({
        SES: new aws.SES({
            apiVersion: '2010-12-01',
            region: 'us-east-1'
        }),
    });

    const pathResolved = path.resolve(__dirname, '..', 'templates', 'welcome.hbs');
    const template = fs.readFileSync(pathResolved).toString('utf-8');
    const templateHtml = compile(template)({ email: user.email, password });

    await transporter.sendMail({
        from: 'Suporte <suporte@oreidablaze.com.br>',
        to: user.email,
        subject: 'Seja bem vindo!',
        html: templateHtml
    });
}

const resetPassword = async (userId, newPassword) => {
    const user = await customerRepository.findById({ id: userId })
    if (!user) {
        throw new Error('user not exist');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.firstaccess = false;
    await customerRepository.update(user);

    return user;
}

const getUser = async (userId) => {
    const user = await customerRepository.findById({ id: userId });
    if (!user) {
        throw new Error('User has exist for id');
    }

    return {
        uuid: user.uuid,
        name: user.name,
        expire_date: user.expire_date
    };
}

module.exports = { findOrCreateUserAsync, getUser, resetPassword }