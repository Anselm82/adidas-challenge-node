import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import mongoose, { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { Review } from '@interfaces/reviews.interface';
import { User } from '@interfaces/users.interface';
import userModel from './models/users.model';
import reviewModel from './models/reviews.model';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    set('strictQuery', true);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options).then(() => {
      this.initData();
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public async initData() {
    try {
      userModel.collection.drop();
      reviewModel.collection.drop();
      userModel.createCollection();
      reviewModel.createCollection();
      const products: string[] = ['GX3062', 'GZ3742', 'FZ6427', 'HQ8678', 'CQ2809', 'G48060', 'HQ2031', 'GY8556'];
      const users: User[] = [];
      for (let index = 0; index < 100; index++) {
        const user = {} as User;
        user.email = index + '@adidas-mail.com';
        user.password = 'password';
        const result = await userModel.create(user);
        users.push(result);
      }
      console.log('Users inserted');
      products.forEach(product => {
        users.forEach(user => {
          const review = {} as Review;
          review.productId = product;
          review.userId = user._id;
          review.score = Math.random() * 10;
          reviewModel.create(review);
        });
      });
      console.log('Reviews inserted');
    } catch (error) {
      console.log(error);
    }
  }
}

export default App;
