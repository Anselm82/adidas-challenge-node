import { Router } from 'express';
import ReviewController from '@controllers/review.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ReviewDto } from '@/dtos/reviews.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class ReviewRoute implements Routes {
  public path = '/reviews';
  public summaryPath = '/review';
  public router = Router();
  public reviewController = new ReviewController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.summaryPath}/:id`, this.reviewController.getReviewSummaryByProductId);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(ReviewDto, 'body'), this.reviewController.createReview);
    this.router.get(`${this.path}/:id`, this.reviewController.getReviewsByProductId);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(ReviewDto, 'body', true), this.reviewController.updateReview);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.reviewController.deleteReview);
  }
}

export default ReviewRoute;
