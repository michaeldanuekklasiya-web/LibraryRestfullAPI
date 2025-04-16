import express from 'express';
import healthController from '../controllers/health-controller.js';

const publicRouter = new express.Router();

publicRouter.get('/up', healthController.ping);


export {
    publicRouter
  }