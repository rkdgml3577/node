const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { user } =require("./models/user");

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://CHOIKANGHEE:choi0730!A@node.cu7l8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {

}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


  app.get('/', (req, res) => {res.send('Hello World! 안녕하세요')})


  app.post('/register', (req, res) => {
    
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다
     


    const User = new user(req.body)

    User.save((err, doc) => {
      if (err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
      })
    })
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})