const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const port = 3000

// ejs使うよーっていう宣言
app.engine('ejs', ejs.renderFile)

// body-parserの初期化
app.use(bodyParser.urlencoded({
  extended: true
}))

// cookie-parserの利用宣言。
// cookie-parserを使うと、リクエストオブジェクトのcookiesプロパティにcookieの値がまとめられる
app.use(cookieParser())

// session-parserを使うと、リクエストオブジェクトのsessionsプロパティにsessionの値がまとめられる
app.use(session({
  secret: 'session-secret', // セッションのハッシュ化に使用する任意の文字列
  resave: true, // リクエストのたびに変更がなくてもセッションデータを保存し直すかどうか
  saveUninitialized: true, // 未初期化状態のセッションを保存するかどうか
}))

app.get('/', (req, res) => {
  console.log('---GET Request---')
  console.log('nameは' + req.query.name) // get通信はquery
  console.log('ageは' + req.query.age)

  let cookieCount = req.cookies.cookieCount == undefined ? 0 : req.cookies.cookieCount
  cookieCount++
  res.cookie('cookieCount', cookieCount, {maxAge: 5000})

  let sessionCount = req.session.sessionCount == undefined ? 0 : req.session.sessionCount
  sessionCount++
  req.session.sessionCount = sessionCount

  res.render('temp.ejs', {
    contents: '<p>content sentence!</p>',
    cookieCount: cookieCount,
    sessionCount: sessionCount,
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
