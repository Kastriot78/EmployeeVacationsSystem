import jwt from 'jsonwebtoken';

export const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: '48h'
    })
}

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    msg: 'Invalid token. Token expired!',
                    validToken: false
                })
            }
            req.user = decode;
            next();
            return
        });
    } else {
        return res.send(401).send({
            msg: 'Token is not supplied.'
        })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({
        msg: 'Admin Token is not valid.',
        isValid: false
    })
}