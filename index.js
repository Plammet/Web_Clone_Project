const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser");
const { user, User } = require("./models/User");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Admin:admin1234@basis.xoikfns.mongodb.net/?retryWrites=true&w=majority')
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})