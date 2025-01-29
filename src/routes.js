import { Router } from 'express';
import homeController from './controllers/home-controler.js';
import movieController from './controllers/movie-controller.js';
import castController from './controllers/cast-controller.js';
import authController from './controllers/auth-controler.js';

const routes = Router();

routes.use(homeController);
routes.use('/movies', movieController); // if path starts with /movies ,example /movies/create send it to movieController as /create
routes.use('/casts', castController);
routes.use('/auth', authController);

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;
