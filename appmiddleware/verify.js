const jwt = require("jsonwebtoken")
require('dotenv').config()
//Promeni mozda(stavi samo tamo gde proveravas password i username da proveri da li je admin i ako nije onda da ga zamenis)pt1
//Odvoj u drugi middleware
const verifyHeader = (req, res, next) =>{
    const hed = req.headers.authorization || req.headers.Authorization

    if(!hed){
        //pt2 Ovde nes
        if(hed.startsWith('Bearer ')){
            return res.sendStatus(401)
        }
    }
    const token = hed.split(" ")[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) =>{
            if(err){
                return res.sendStatus(403)
            }
            req.user = decoded.id
            req.user = decoded.role
            next()
        }
    )
}

const verifyRole = (allowedRole) =>{
    return (req, res, next) =>{
        console.log
        if(!req){
            return res.sendStatus(401)
        }
        if(!req.role){
            return res.sendStatus(401)
        }
        if(req.role == 1){

        }else if(req.role ==2){
            if(allowedRole == 1){
                return res.sendStatus(401)
            }
        }
        next()
    }
}

const verifyJwt = (req, res, next) => {
 
    const cookies = getCookies(req)
    const token = cookies['jwt']

    //console.log(cookies)

    if(token == null){
        return res.redirect(302,'/login')
    }
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if(err){
                return res.redirect(302,'/login')
            }
      
            req.user = decoded.id
            req.role = decoded.role
            next()
        }
    )
}
function getCookies(req){

    if(req.headers.cookie == null){
        return{}
    }
    const rawCookies = req.headers.cookie.split('; ')
    const parsedCookies = {}

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=')
        parsedCookies[parsedCookie[0]] = parsedCookie[1]
        
    });

    return parsedCookies
}

module.exports ={
    verifyJwt : verifyJwt,
    verifyRole: verifyRole
} 