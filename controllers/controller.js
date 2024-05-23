const { User, Category } = require("../models/index");
const bcryptjs = require("bcryptjs");
const {sendEmail} = require('../helpers/index') 

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
      res.render("formRegister");
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
      console.log(error);
      res.send(error);
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
      let category = await Category.findAll()
      res.render('home', {category})
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

  static async showInvestments(req, res) {
    try {
      res.send("b");
    } catch (error) {
      res.send(error);
    }
  }

  static async showCompanies(req, res) {
    try {
      res.send("c");
    } catch (error) {
      res.send(error);
    }
  }

  static async showCompanies(req, res) {
    try {
      res.send("c");
    } catch (error) {
      res.send(error);
    }
  }

  static async showCategories(req, res) {
    try {
      res.send("d");
    } catch (error) {
      res.send(error);
    }
  }

  static async showUsers(req, res) {
    try {
      res.send("e");
    } catch (error) {
      res.send(error);
    }
  }

  static async showUserInvestments(req, res) {
    try {
      res.send("f");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
