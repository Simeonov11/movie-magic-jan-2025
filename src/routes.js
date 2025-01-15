import { Router } from 'express';
import homeController from './controllers/home-controler.js';

const router = Router();

router.use(homeController);

router.get('*', (req, res) => {
    res.render('404');
});

export default router;
