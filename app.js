const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = 3000

app.engine('ejs', ejs.renderFile) // ejs使うよーっていう宣言
app.use(bodyParser.urlencoded({ // body-parserの初期化
  extended: true
}))
app.use(cookieParser())
// cookie-parserの利用宣言。
// cookie-parserをつかと、リクエストオブジェクトのcookiesプロパティにcookieの値がまとめられる

app.get('/', (req, res) => {
  console.log('---GET Request---')
  console.log('nameは' + req.query.name) // get通信はquery
  console.log('ageは' + req.query.age)

  let count = req.cookies.count == undefined ? 0 : req.cookies.count
  count++
  res.cookie('count', count, {maxAge: 5000})

  res.render('temp.ejs', {
    contents: '<p>content sentence!</p>',
    count: count
  })
})

app.post('/', (req, res) => {
  console.log('---POST Request---')
  console.log('nameは' + req.body.name) // post通信はbody
  console.log('ageは' + req.body.age)
  res.render('temp.ejs', {
    contents: '<p>content sentence!</p>'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
