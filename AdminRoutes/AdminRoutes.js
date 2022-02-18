const {Router} = require('express')
const route = Router()
const AdminControllers = require('../adminControllers/AdminControllers')

route.get('/admin', AdminControllers.Checkin)

module.exports = route