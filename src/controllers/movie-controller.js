import { Router } from 'express';
import movieService from '../services/movie-service.js';

const movieController = Router();

movieController.get('/search', (req, res) => {
    //console.log(req.query);
    const filter = req.query;
    const movies = movieService.getAll(filter);
    res.render('search', { movies, filter });
});


movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;
    //console.log(newMovie);

    movieService.create(newMovie);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    // Get movie data for movieId
    const movie = await movieService.getOne(movieId);
    //console.log(movie);

    res.render('details', { movie });
});

export default movieController;