import { Router } from 'express';
import homeController from './controllers/home-controler.js';
import movieController from './controllers/movie-controller.js';

const routes = Router();

routes.use(homeController);
routes.use('/movies', movieController); // if path starts with /movies ,example /movies/create send it to movieController as /create

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;
