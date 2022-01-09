const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles} = require('../models')
const bcrypt = require('bcrypt')

router.route('/')
    .post(async (req, res) =>{
          const user = {
              email: req.body.email,
              password: req.body.password,
              name: req.body.name,
              roleId: 1
          } 
         try{
            
            await schema.validateAsync(user)
            const ae = await Users.findOne({where:{email:user.email}})
            if(typeof ae === 'undefined' || ae){
                return res.status(409).json({error:"User already exists"})
            }else{

            }
           

            const encrPass = bcrypt.hashSync(user.password, 10) 
            user.password = encrPass

            await Users.create(user) 
            return res.status(201).json({'success': `User email: ${user.email}`})   
         }catch(err){
             console.log(err)
            return res.status(409).json(err)
         }
          

    })
const schema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments : 2,
        })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{5,25}$'))
        .required(),
    name: Joi.string()
        .required(),
    roleId: Joi.number() 
    
})

module.exports = router