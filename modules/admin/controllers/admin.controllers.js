const Response = require('../../../configuration/config.response');
bcrypt = require('bcrypt'),
    { PrismaClient } = require('@prisma/client'),
    Prisma = new PrismaClient(),
    { sendEmail } = require("../../../configuration/config.mailer");
const jwt = require("jsonwebtoken");

const adminController = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next({ msg: 100 });
        }
        const userWithEmail = await Prisma.admin.findFirst({ where: { adm_user:  email } });

        if (!userWithEmail) {
            return next({ msg: 101});
        }

        let isPasswordMatched = await bcrypt.compare(password, userWithEmail.adm_password);

        if (!isPasswordMatched) {
            return next({ msg: 102});
        }

        const jwtToken = jwt.sign(
            { id: userWithEmail.id, user: userWithEmail },
            config.jwtSetting.secret
        );


        delete userWithEmail.password;
        return Response.sendResponse(
            res, {
            msg: '305',
            data: {
                token: jwtToken,
                user: userWithEmail
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const adminProfile = async (req, res, next) => {
    try {
        console.log(req.user)
        return Response.sendResponse(
            res, {
            msg: '306',
            data: {
                user: req.user.user,
            },
            lang: req.params.lang
        });
    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });

    }
}


module.exports = {
    adminController,
    adminProfile,
};