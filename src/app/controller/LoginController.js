import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../model/User.js';

class LoginController{
    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        try {
            await schema.validate(req.body, {abortEarly: false});

            const { email, password } = req.body;

            const user = await User.findOne({email});
            
            if(!user){
                return res.status(401).json({error: 'email ou senhas invalidos'});
                
            }

            if(!(await bcrypt.compare(password, user.password))){
                return res.status(401).json({error: 'email ou senhas invalidos'});
            }
            
            const token = jwt.sign({id: user._id, name: user.name, email: user.email}, 'login', {
                expiresIn: '1d'
            });

            return res.status(200).json({
                user: {
                id: user._id,  
                name: user.name,
                email: user.email
                },
                token
            });
            

        } catch (err) {
            console.log(err);
            return res.status(400).json({error: err.errors});
        }
    }
}

export default new LoginController();