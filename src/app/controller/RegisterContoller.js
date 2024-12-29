import * as yup from 'yup';
import bcrypt from 'bcrypt';

import User from '../model/User.js';

class RegisterController{
    async store(req,res){
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(6).required()
        })

        try{
            await schema.validate(req.body, {abortEarly: false});

            const {name, email, password} = req.body;

            const EmailExists = await User.findOne({email})

            if(EmailExists){
                return res.status(400).json({error: "Email already exists"});
            }

            const user = await User.create({
                name,
                email,
                password
            });

            return res.status(201).json(user);
        }catch(err){
            console.log(err);
            return res.status(400).json({error: err.errors});
        }
    }
    async update(req, res) {
        const schema = yup.object().shape({
          name: yup.string(),
          email: yup.string().email()
        });
    
        try {
          await schema.validate(req.body, { abortEarly: false });
          
          const { id } = req.params;
          const { name, email } = req.body;
          
          const user = await User.findById(id);
          
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
    
          if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
              return res.status(400).json({ error: "Email already exists" });
            }
          }
    
          const updateFields = {};
          if (name) updateFields.name = name;
          if (email) updateFields.email = email;
    
          await User.updateOne(
            { _id: id },
            { $set: updateFields }
          );
    
          const updatedUser = await User.findById(id);
    
          return res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
          });
    
        } catch (err) {
          console.log(err);
          return res.status(400).json({ error: err.errors });
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;

            const user = await User.findById(id);

            if(!user){
                return res.status(404).json({error: "User not found"});
            }

            await user.deleteOne();

            return res.status(204).json({menssage: "User deleted"});
        }catch(err){
            console.log(err);
            return res.status(400).json({error: err.errors});
        }
    }
}

export default new RegisterController();