import { CreateUserDto } from '@/dtos/users.dto';
import { Review } from '@/interfaces/reviews.interface';
import reviewModel from '@/models/reviews.model';
import userModel from '@/models/users.model';
import { faker } from '@faker-js/faker';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      //this.initData();
      res.redirect('/api-docs');
    } catch (error) {
      next(error);
    }
  };

  public async initData() {
    try {
      const products = ['GX3062', 'GZ3742', 'FZ6427', 'HQ8678', 'CQ2809', 'G48060', 'HQ2031', 'GY8556'];
      const users = [];
      for (let index = 0; index < 100; index++) {
        const user = {} as CreateUserDto;
        user.email = faker.name.fullName() + '@adidas-mail.com';
        user.password = 'password';
        console.log(user);
        // const result = await userModel.create(user);
        // users.push(result._id);
      }
      products.forEach(product => {
        users.forEach(user => {
          const review = {} as Review;
          review.productId = product;
          review.userId = user;
          review.score = Number(faker.random.numeric(1, { bannedDigits: ['6', '7', '8', '9'] }));
          console.log(review);
          // reviewModel.create(review);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default IndexController;
