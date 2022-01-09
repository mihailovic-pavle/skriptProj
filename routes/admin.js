const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { QueryTypes } = require('sequelize')
require('dotenv').config()

router.route('/')
    .post(async (req, res) =>{
        console.log(await database())
    })
//pt2
router.use('/users',require('../routes/users.js'))

router.use('/posts',require('../routes/posts.js'))

router.use('/comments',require('../routes/comments.js'))
    
async function database(){
    return await sequelize.query(`
        select table_name from information_schema.tables where table_schema = 'kuvanje';`,
        {
            type: QueryTypes.SELECT
        }).then(res =>{
            const niz = res.map(function(obj){
                return obj.TABLE_NAME
            })
            return niz
        })      
}

module.exports = router