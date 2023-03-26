import { NextFunction, Request, Response } from 'express';
import { ReviewDto, ReviewsSummaryDto } from '@dtos/reviews.dto';
import { Review } from '@interfaces/reviews.interface';
import ReviewService from '@services/reviews.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class ReviewsController {
  public reviewService = new ReviewService();

  public getReviewsByProductId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params['id'];
      const findAllReviewsData: Review[] = await this.reviewService.findReviewsByProductId(productId);

      res.status(200).json({ data: findAllReviewsData, message: 'findReviewsByProductId' });
    } catch (error) {
      next(error);
    }
  };

  public getReviewSummaryByProductId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params['id'];
      const findAllReviewsData: Review[] = await this.reviewService.findReviewsByProductId(productId);
      const response: ReviewsSummaryDto = {
        productId: productId,
        averageRating: findAllReviewsData.length ? findAllReviewsData.map(item => item.score).reduce((a, b) => a + b) / findAllReviewsData.length : 0,
        reviews: findAllReviewsData.length,
      };
      res.status(200).json({ data: response, message: 'getReviewSummaryByProductId' });
    } catch (error) {
      next(error);
    }
  };

  public createReview = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      debugger;
      const reviewData: ReviewDto = req.body;
      const userId = req.user._id;
      const createReviewData: Review = await this.reviewService.createReview(reviewData, userId);

      res.status(201).json({ data: createReviewData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = req.params['id'];
      const reviewData: ReviewDto = req.body;
      const updateReviewData: Review = await this.reviewService.updateReview(reviewId, reviewData);

      res.status(200).json({ data: updateReviewData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = req.params['id'];
      const deleteReviewData: Review = await this.reviewService.deleteReview(reviewId);

      res.status(200).json({ data: deleteReviewData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ReviewsController;
