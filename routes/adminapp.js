const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { QueryTypes } = require('sequelize')
require('dotenv').config()

router.get("/" ,(req, res) => {
    res.sendFile('dashboard.html', {root: './static/'})
})

router.get("/users" ,(req, res) => {
    res.sendFile('crudprozor.html', {root: './static/'})
})

router.get("/posts" ,(req, res) => {
    res.sendFile('crudpost.html', {root: './static/'})
})

router.get("/comments" ,(req, res) => {
    res.sendFile('crudcomment.html', {root: './static/'})
})
module.exports = router