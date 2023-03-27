import { ReviewsSummaryDto, ReviewDto, AdidasProductDto } from '@/dtos/models.dto';
import fetch from 'node-fetch';
import { ADIDAS_API, REVIEWS_SERVICE } from '@config';
class ProductService {
  public async findProductById(productId: string) {
    const summary = this.getSummaryForProductId(productId);
    const reviews = this.getReviewsForProductId(productId);
    //const product = this.getProductById(productId);
    //Product promise hangs the server. Abort controller also breaks node, so no timeout is possible.
    const promises = await Promise.all([summary, reviews]);
    return {
      summary: promises[0],
      reviews: promises[1],
      product: productId,
    } as AdidasProductDto;
  }

  public getSummaryForProductId(productId: string): Promise<ReviewsSummaryDto> {
    return this.call<ReviewsSummaryDto>(
      `${REVIEWS_SERVICE}/review/${productId}`,
      {
        productId: productId,
        averageRating: 0,
        reviews: 0,
      } as ReviewsSummaryDto,
      { Accept: 'application/json' },
    );
  }

  public getReviewsForProductId(productId: string): Promise<ReviewDto[]> {
    return this.call<ReviewDto[]>(`${REVIEWS_SERVICE}/reviews/${productId}`, [], { Accept: 'application/json' });
  }

  private async call<T>(url: string, orDefault: any, headers?: any): Promise<T> {
    return fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
      },
    })
      .then((result: any) => result.json())
      .catch((err: any) => orDefault ?? err) as Promise<T>;
  }

  public async getProductById(productId: string): Promise<any> {
    const url = `${ADIDAS_API}/products/${productId}`;
    return this.call<any>(url, null, { Accept: 'application/json' });
  }
}

export default ProductService;
