import { NextFunction, Request, Response } from 'express';
import ProductService from '@services/products.service';

class ProductsController {
  public productService = new ProductService();

  public getProductById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = await this.productService.findProductById(request.params['id']);
      return response.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
