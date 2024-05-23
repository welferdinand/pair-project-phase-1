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

let loginCheck = function (req, res, next) {
    
    if(!req.session.username){
        const error = 'You did not login yet! :D'
        res.redirect(`/login?error=${error}`)
    }else {
        next()
    }
}

let roleCheck = function (req, res, next) {
    
    if(req.session.role !== "admin"){
        const error = 'You did not have the access to this button! >:('
        res.redirect(`/login?error=${error}`)
    }else {
        next()
    }
}

router.get('/home', loginCheck, Controller.showHomepage)

router.get('/companies', loginCheck, Controller.showCompanies)

router.get('/companies/add', loginCheck, roleCheck, Controller.formAddCompany)
router.post('/companies/add', loginCheck, roleCheck, Controller.postAddCompany)

router.get('/companies/:id/edit', loginCheck, roleCheck, Controller.formEditCompany)
router.post('/companies/:id/edit', loginCheck, roleCheck, Controller.postEditCompany)

router.get('/companies/:id/delete', loginCheck, roleCheck, Controller.deleteCompany)

router.get('/portofolios', loginCheck, Controller.showUsers)

router.get('/categories/:id', loginCheck, Controller.showCategories)

router.get('/categories/:id/add', loginCheck, roleCheck, Controller.formAddInvestment)
router.post('/categories/:id/add', loginCheck, roleCheck, Controller.postAddInvestment)

// router.get('/users/:id', loginCheck, Controller.showUserInvestments)


module.exports = router