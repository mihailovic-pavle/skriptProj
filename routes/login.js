const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
    .post(async (req, res) =>{

        //console.log(req)

          const user = {
              email: req.body.email,
              password: req.body.password,
          } 
         try{
            
            await schema.validateAsync(user)
            const ae = await Users.findOne({where:{email:user.email}})
            if(!ae){
                return res.status(401).json({error:"User not found"})
            }
           const pp = await bcrypt.compare(user.password,ae.password)

           if(!pp){
                 return res.status(401).json({error:"Wrong password"})
           }

           //Autorizacija jwt:
           
           const accessToken = jwt.sign({
                "id": ae.id,
                    "role": ae.roleId
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '120s'}
           )
         

          return  res.json({jwt: accessToken})

           
         }catch(err){
            return res.status(401).json(err)
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
        .required()
    
})

module.exports = router