const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')

const routes = express.Router();

const BoxController = require('./controller/BoxController');
const FileController = require('./controller/FileController');

// Box routes
routes.post('/api/box/create', BoxController.store);
routes.get('/api/box/:id', BoxController.show);

// File routes
routes.post(
    '/api/box/:id/file/create', 
    multer(multerConfig).single("file"), 
    FileController.store
);

module.exports = routes;