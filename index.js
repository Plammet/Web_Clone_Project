const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { user, User } = require("./models/User");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',  (req, res) => {
  // 회원가입 정보를 client에서 받아와서 DB에 삽입

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {
  User.findOne({ email : req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "등록되지 않은 이메일입니다."
      })
    }  
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});
      
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userID : user._id })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})