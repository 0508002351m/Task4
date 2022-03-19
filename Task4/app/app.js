const express = require ("express")
const hbs = require ("hbs")
const path = require ("path")
const app = express()
const router =require("../routes/customer.route")
const staticDir = path.join(__dirname,"../assets")
const viewsDir = path.join(__dirname,"../resources/views")
const layoutsDir = path.join(__dirname,"../resources/layouts")
app.use(express.static(staticDir))
app.set("view engine","hbs")
app.set("views",viewsDir)
hbs.registerPartials(layoutsDir) 
app.use(router)

module.exports = app