import express from 'express';
import healthController from '../controllers/health-controller.js';
import bookController from '../controllers/book-controller.js';

const publicRouter = new express.Router();

publicRouter.get('/up', healthController.ping);
publicRouter.post('/books', bookController.uploadBook);

export {
  publicRouter
}