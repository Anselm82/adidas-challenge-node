import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ReviewRoute from '@routes/reviews.routes';

validateEnv();

export const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new ReviewRoute()]);

app.listen();
