import { IsNumber, IsString } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  public score: number;
  @IsString()
  public productId: string;
}

export class ReviewsSummaryDto {
  @IsString()
  public productId: string;
  @IsNumber()
  public averageRating: number;
  @IsNumber()
  public reviews: number;
}
