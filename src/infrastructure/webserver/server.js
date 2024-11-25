// src/infrastructure/webserver/server.js
import express from 'express';
import UserController from '../../interfaces/controllers/UserController.js';

const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
  UserController.createUser(req, res);
});

export default app;
