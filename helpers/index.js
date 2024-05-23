const nodemailer = require('nodemailer');

async function sendEmail(email){
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use TLS connection
        service: 'gmail',
        auth: {
          user: 'welferdinand@gmail.com',
          pass: 'lgym yhqz gmdh rxwo'
        }
      });
      
      var mailOptions = {
        from: 'welferdinand@gmail.com',
        to: email,
        subject: 'Pendaftaran Akun Bobot Anda Berhasil!',
        text: 'silahkan kembali ke form login untuk melanjutkan kegiatan anda!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

function format_rupiah(balance){
  return balance.toLocaleString("id-ID", {style: "currency", currency: "IDR"})
}

module.exports = {sendEmail, format_rupiah}