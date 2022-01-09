const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles, Posts} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { QueryTypes } = require('sequelize')
require('dotenv').config()

router.route('/')
//pt2
    .get(async (req, res) =>{
        return res.json(await Posts.findAll())
    })
    .post(async (req, res) =>{
        const post = {
            name: req.body.name,
            userId: req.body.userId,
        } 
      
          try{
            await schema.validateAsync(post)
            const ae = await Users.findOne({where:{id:req.body.userId}})
            if(typeof ae === 'undefined' || !ae){
                return res.status(409).json({error:"User doesnt exist"})
            }else{

            }

            await Posts.create(post) 
            return res.json(post)  
          }catch(error){
            res.status(409).json(error) 
          }
          
      
        

  })
  
router.route('/:id')
.get(async (req, res) =>{
    const post = await Posts.findOne({where:{id: req.params.id}})
    if(!post){
        return res.status(204).json({error :"No such post"})
    }
    return res.json(post)
})
.delete(async (req, res) =>{
       
       const ae = await Posts.findOne({where:{id:req.params.id}})
       if(typeof ae === 'undefined' || !ae){
         return res.status(404).json({error:"No such post"})
       }
      
 
       const obrisan = await ae.destroy()
      return res.json(obrisan)  
   })
   //!!!!!!!MOras put da sredis odakle ti  id
   .put(async (req, res) =>{
        const ae = await Posts.findOne({where:{id:req.params.id}})
        if(typeof ae === 'undefined' || !ae){
            return res.status(404).json({error:"No such user"})
        }
        if(ae.likes == null){
            ae.likes = parseInt(req.body.likes) 
        }else{
            ae.likes = ae.likes + parseInt(req.body.likes)  
        }
        
        await ae.save()
        return res.json(ae)
    })
//Joi cp iz register
  const schema = Joi.object({
    name: Joi.string()
        .required(),
    userId: Joi.number() 
    
})
    
async function database(){
      
}

module.exports = router