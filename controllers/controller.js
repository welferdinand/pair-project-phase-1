const { User, Category, Investment, Company } = require("../models/index");
const bcryptjs = require("bcryptjs");
const {sendEmail, format_rupiah} = require('../helpers/index') 

class Controller {

  static async showLanding(req, res) {
    try {
      res.render('landingPage')
    } catch (error) {
      res.send(error);
    }
  }

  static async showFormRegister(req, res) {
    try {
      let {error} = req.query
      res.render("formRegister", {error});
    } catch (error) {
      res.send(error);
    }
  }

  static async postFormRegister(req, res) {
    try {
      let { username, password, email } = req.body;
      await User.create({ username, password, email });
      await sendEmail(email);
      res.redirect("/login");
    } catch (error) {
      if(error.name === "SequelizeValidationError"){
        let errors = error.errors.map(el => el.message)
        res.redirect(`/register?error=${errors}`)
      }else {
        res.send(error);
      }
    }
  }

  static async showFormLogin(req, res) {
    try {
      const {error} = req.query
      res.render("formLogin", {error});
    } catch (error) {
      res.send(error);
    }
  }

  static async postFormLogin(req, res) {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ where: { username } });

      if (user) {
        const passwordValidation = bcryptjs.compareSync(
          password,
          user.password
        );
        if (passwordValidation) {
          //berhasil login

          req.session.UserId = user.id
          req.session.username = user.username // set session di controller login
          req.session.balance = user.balance
          req.session.role = user.role

          res.redirect("/home");
        } else {
          let errors = "Invalid username / password"
          res.redirect(`/login?error=${errors}`);
        }
      } else {
        let errors = "Invalid username / password"
        res.redirect(`/login?error=${errors}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async showHomepage(req, res) {
    try {
      let {username, balance} = req.session
      let category = await Category.findAll()
      res.render('home', {category, username, balance, format_rupiah})
    } catch (error) {
      res.send(error);
    }
  }

  static async logoutSession(req, res) {
    try {
      req.session.destroy()
      res.redirect('/login')
    } catch (error) {
      res.send(error);
    }
  }

  static async showCompanies(req, res) {
    try {
      let {search} = req.query
      let data = await Company.getCompanyByName(search)
      let {username, balance} = req.session
      res.render('companyList', {username, balance, format_rupiah, data})
    } catch (error) {
      res.send(error);
    }
  }

  static async showCategories(req, res) {
    try {
      let {id} = req.params
      let {search} = req.query
      let {username, balance} = req.session
      let category = await Category.findByPk(id)
    
      // let investment = await Investment.findAll({
      //   include : Company,
      //   where : {
      //     CategoryId : id
      //   }
      // })

      let investment = await Investment.getInvestmentByName(id, search)
      res.render('detailCategory', {investment, category, username, balance, format_rupiah});
    } catch (error) {
      res.send(error);
    }
  }

  static async showUsers(req, res) {
    try {
      let {username, balance} = req.session
      res.render('userPortfolio', {username,balance, format_rupiah})
    } catch (error) {
      res.send(error);
    }
  }

  static async formAddCompany(req, res) {
    try {
      let {error} = req.query
      res.render('formAddCompany', {error})
    } catch (error) {
      res.send(error);
    }
  }

  static async postAddCompany(req, res) {
    try {
      let {name, location, email, companyLogo, description} = req.body

      await Company.create({name, location, email, companyLogo, description})

      res.redirect('/companies')
    } catch (error) {
      if(error.name = "SequelizeValidationError") {
        let errors = error.errors.map(el => el.message)
        res.redirect(`/companies/add?error=${errors}`)
      } else {
        res.send(error);
      }
    }
  }

  static async formEditCompany(req, res) {
    try {
      let {error} = req.query
      let {id} = req.params

      let data = await Company.findByPk(id)
      res.render('formEditCompany', {error, data});
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditCompany(req, res) {
    try {
      let {id} = req.params
      let {name, location, email, companyLogo, description} = req.body

      await Company.update({name, location, email, companyLogo, description}, {where : {id}})

      res.redirect('/companies')
    } catch (error) {
      let {id} = req.params

      if(error.name = "SequelizeValidationError") {
        let errors = error.errors.map(el => el.message)
        res.redirect(`/companies/${id}/edit?error=${errors}`)
      } else {
        res.send(error);
      }
    }
  }
  
  static async deleteCompany(req,res) {
    try {
      let {id} = req.params
      await Company.destroy({
        where : {id}
      })
      res.redirect('/companies')
    } catch (error) {
      res.send(error)
    }
  }

  static async formAddInvestment(req, res) {
    try {
      let {error} = req.query
      let {id} = req.params
      let company = await Company.findAll()
      res.render('formAddInvestment', {company, id, error});
    } catch (error) {
      res.send(error);
    }
  }

  static async postAddInvestment(req, res) {
    try {
      let {name, CompanyId, investmentType, amount, description} = req.body
      let {id} = req.params

      await Investment.create({
        name,
        description,
        CompanyId,
        investmentType,
        amount, 
        CategoryId: id
      })

      res.redirect(`/categories/${id}`)
    } catch (error) {
      let {id} = req.params

      if(error.name = "SequelizeValidationError") {
        let errors = error.errors.map(el => el.message)
        res.redirect(`/categories/${id}/add?error=${errors}`)
      } else {
        res.send(error);
      }
    }
  }


}

module.exports = Controller;
