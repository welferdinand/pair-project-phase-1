const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.showLanding)

// get /register
router.get('/register', Controller.showFormRegister)

// post /register
router.post('/register', Controller.postFormRegister)

// get /login
router.get('/login', Controller.showFormLogin)

// post /login
router.post('/login', Controller.postFormLogin)


router.get('/logout', Controller.logoutSession)

router.use(function (req, res, next) {
    console.log(req.session);
    
    if(!req.session.username){
        const error = 'You did not login yet! :D'
        res.redirect(`/login?error=${error}`)
    }else {
        next()
    }
})

router.get('/home', Controller.showHomepage)

router.get('/investments', Controller.showInvestments)

router.get('/companies', Controller.showCompanies)


router.get('/users', Controller.showUsers)

router.get('/categories/:id', Controller.showCategories)
router.get('/users/:id', Controller.showUserInvestments)


module.exports = router