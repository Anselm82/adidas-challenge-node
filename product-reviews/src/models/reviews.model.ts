import { model, Schema, Document } from 'mongoose';
import { Review } from '@interfaces/reviews.interface';

const reviewSchema: Schema = new Schema({
  score: {
    type: Number,
    required: true,
    unique: false,
  },
  productId: {
    type: String,
    required: true,
    unique: false,
  },
  userId: {
    type: String,
    required: true,
    unique: false,
  },
});

const reviewModel = model<Review & Document>('Review', reviewSchema);

export default reviewModel;
