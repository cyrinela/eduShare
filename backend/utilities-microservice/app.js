import express from "express";
import cors from 'cors';
import "dotenv/config";

import commentsRoutes from "./routes/comments.js";

import { Eureka } from "eureka-js-client";
import eurekaConfig from "./eurekaConfig.js";

// INIT APP
const app = express();
const PORT = process.env.PORT || 3000;

// LOAD MIDDLEWARES
app.use(cors())
app.use(express.json());
app.use('/comments', commentsRoutes);

// EUREKA CONFIG
const eurekaClient = new Eureka(eurekaConfig);
// EUREKA HEALTH CHECK
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // REGISTRATION ON EUREKA SERVER
    eurekaClient.start((error) => {
        if (error) {
          console.error('Failed to connect to Eureka server:', error);
        } else {
          console.log('Successfully registered with Eureka');
        }
    });
})

export default app;