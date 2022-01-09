const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { QueryTypes } = require('sequelize')
require('dotenv').config()

router.route('/')
//pt2
    .get(async (req, res) =>{
        return res.json(await Users.findAll())
    })
    .post(async (req, res) =>{
        const user = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            roleId: 2
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
            return res.json(user)  
          }catch(error){
            res.status(409).json(error) 
          }
          
      
        

  })
  
router.route('/:id')
.get(async (req, res) =>{
    const user = await Users.findOne({where:{id: req.params.id}})
    if(!user){
        return res.status(204).json({error :"No such user"})
    }
    return res.json(user)
})
.delete(async (req, res) =>{
       
       const ae = await Users.findOne({where:{id:req.params.id}})
       if(typeof ae === 'undefined' || !ae){
         return res.status(404).json({error:"No such user"})
       }
      
 
       const obrisan = await ae.destroy()
      return res.json(obrisan)  
   })
   //!!!!!!!MOras put da sredis odakle ti  id
   .put(async (req, res) =>{
        const ae = await Users.findOne({where:{id:req.params.id}})
        if(typeof ae === 'undefined' || !ae){
            return res.status(404).json({error:"No such user"})
        }
        ae.roleId = req.body.roleId
        await ae.save()
        return res.json(ae)
    })
//Joi cp iz register
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
    
async function database(){
      
}

module.exports = router