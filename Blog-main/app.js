require('dotenv').config()
const express = require('express');
const app=express()
const expressLayout=require('express-ejs-layouts')
const methodOverride=require('method-override')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const connectDB=require('./server/config/db')
const cookieParser=require('cookie-parser')
const session = require('express-session');
const MongoStore=require('connect-mongo')
const {isActiveRoute}=require('./server/helpers/routeHelpers')


app.use(express.static('public'))

const PORT = 5000 || process.env.PORT;

connectDB();
//middlewares

app.use(express.urlencoded({ extended: true })) // to get the search data on searching 
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))



app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true,
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    })
})
)
app.use(express.static('public'));
//template engine
app.use(expressLayout)
app.set('layout','./layout/main')
app.set('view engine','ejs')
app.locals.isActiveRoute=isActiveRoute

app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))

app.listen(PORT,()=>{
    console.log((`app listing on port ${PORT}`))
})