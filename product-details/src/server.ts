import App from '@/app';
import IndexRoute from '@routes/index.route';
import ProductsRoute from '@/routes/products.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

export const app = new App([new IndexRoute(), new ProductsRoute()]);

app.listen();
