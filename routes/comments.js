const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles, Posts, Comments} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { QueryTypes } = require('sequelize')
require('dotenv').config()

router.route('/')
//pt2
    .get(async (req, res) =>{
        return res.json(await Comments.findAll())
    })
    .post(async (req, res) =>{
        const comment = {
            content: req.body.content,
            userId: req.body.userId,
            postId: req.body.postId,
        } 
       
          try{
            await schema.validateAsync(comment)
             
            const ae = await Users.findOne({where:{id:req.body.userId}})
            if(typeof ae === 'undefined' || !ae){
                return res.status(409).json({error:"User doesnt exist"})
            }else{

            }
            const ae2 = await Posts.findOne({where:{id:req.body.postId}})
            if(typeof ae2 === 'undefined' || !ae2){
                return res.status(409).json({error:"Post doesnt exist"})
            }else{

            }
            

            await Comments.create(comment) 
            return res.json(comment)  
          }catch(error){
            res.status(409).json(error) 
          }
          
      
        

  })
  
router.route('/:id')
.get(async (req, res) =>{
    const comment = await Comments.findOne({where:{id: req.params.id}})
    if(typeof comment === 'undefined' || !comment){
        return res.status(204).json({error :"No such comment"})
    }
    return res.json(comment)
})
.delete(async (req, res) =>{
       
       const ae = await Comments.findOne({where:{id:req.params.id}})
       if(typeof ae === 'undefined' || !ae){
         return res.status(404).json({error:"No such comment"})
       }
      
 
       const obrisan = await ae.destroy()
      return res.json(obrisan)  
   })
   //!!!!!!!MOras put da sredis odakle ti  id
   .put(async (req, res) =>{
        const ae = await Comments.findOne({where:{id:req.params.id}})
        if(typeof ae === 'undefined' || !ae){
            return res.status(404).json({error:"No such commment"})
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
    content: Joi.string()
        .required(),
    postId: Joi.number(),
    userId: Joi.number()  
    
})
    
async function database(){
      
}

module.exports = router