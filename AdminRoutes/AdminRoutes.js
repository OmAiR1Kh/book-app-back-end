const {Router} = require('express')
const route = Router()
const AdminControllers = require('../adminControllers/AdminControllers')

route.post('/admin', AdminControllers.Checkin)

module.exports = route