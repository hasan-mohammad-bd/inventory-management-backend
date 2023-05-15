const express = require("express");
const router = express.Router();
const storeController = require('../controlers/store.controller')



router  
    .route('/')
    .get(storeController.getStore)
    .post(storeController.createStore)



router
    .route('/:id')
    .get(storeController.getStoreById)

module.exports = router