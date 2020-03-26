'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    try {
        var data = await jwt.decode(token)
        return data;
    } catch (error) {
        console.log(error)
    }
}

exports.authorize = (req, res, next) => {
    // var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    var token = req.headers['authorization']


    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        token = token.replace('Bearer ', '')
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    // var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    var token = req.headers['authorization']

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        token = token.replace('Bearer ', '')
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};