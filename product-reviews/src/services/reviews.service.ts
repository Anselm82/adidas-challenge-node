import { ReviewDto } from '@dtos/reviews.dto';
import { HttpException } from '@exceptions/HttpException';
import { Review } from '@interfaces/reviews.interface';
import reviewModel from '@models/reviews.model';
import { isEmpty } from '@utils/util';

class ReviewService {
  public reviews = reviewModel;

  public async findReviewById(reviewId: string): Promise<Review> {
    if (isEmpty(reviewId)) throw new HttpException(400, 'ReviewId is empty');

    const findReview: Review = await this.reviews.findOne({ id: reviewId });
    if (!findReview) throw new HttpException(409, "Review doesn't exist");

    return findReview;
  }

  public async findReviewsByProductId(productId: string): Promise<Review[]> {
    if (isEmpty(productId)) throw new HttpException(400, 'ProductId is empty');

    const findReviews: Review[] = await this.reviews.find({ productId: productId });
    if (!findReviews.length) throw new HttpException(409, "Reviews doesn't exist");

    return findReviews;
  }

  public async createReview(reviewData: ReviewDto, userId: string): Promise<Review> {
    if (isEmpty(reviewData)) throw new HttpException(400, 'ReviewData is empty');
    const findProductUserReview: Review = await this.reviews.findOne({ productId: reviewData.productId, userId: userId });
    if (findProductUserReview) throw new HttpException(409, `You already reviewed ${reviewData.productId}`);

    const createReviewData: Review = await this.reviews.create({ ...reviewData, userId: userId });

    return createReviewData;
  }

  public async updateReview(reviewId: string, reviewData: ReviewDto): Promise<Review> {
    if (isEmpty(reviewData)) throw new HttpException(400, 'ReviewData is empty');

    const updateReviewById: Review = await this.reviews.findByIdAndUpdate(reviewId, { reviewData });
    if (!updateReviewById) throw new HttpException(409, "Review doesn't exist");

    return updateReviewById;
  }

  public async deleteReview(reviewId: string): Promise<Review> {
    const deleteReviewById: Review = await this.reviews.findByIdAndDelete(reviewId);
    if (!deleteReviewById) throw new HttpException(409, "Review doesn't exist");

    return deleteReviewById;
  }
}

export default ReviewService;
