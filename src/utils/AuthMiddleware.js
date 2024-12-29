import jwt from 'jsonwebtoken';

export default function AuthMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'Token não informado'});
    }

    const [, token] = authHeader.split(' ');

    try {
        jwt.verify(token, 'login');
        return next();
    } catch (err) {
        return res.status(401).json({error: 'Token invalido'})
    }
}