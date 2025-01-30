import { Router } from "express";
import castService from "../services/cast-service.js";
import { isAuthorised } from "../middlewares/auth-middleware.js";

const  castController = Router();

castController.use(isAuthorised); // restricting the access to the controler if user is not Authorised /casts/create

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) => {
    const castData = req.body;
    await castService.create(castData);

    res.redirect('/');
});

export default castController;