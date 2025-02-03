import { Router } from 'express';
import movieService from '../services/movie-service.js';
import castService from '../services/cast-service.js';
import { isAuthorised } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js';

const movieController = Router();

movieController.get('/search', async (req, res) => {
    //console.log(req.query);
    const filter = req.query;
    const movies = await movieService.getAll(filter);
    res.render('search', { movies, filter });
});


movieController.get('/create', isAuthorised, (req, res) => {
    res.render('create');
});

movieController.post('/create', isAuthorised, async (req, res) => {
    const newMovie = req.body;
    //console.log(newMovie);

    const userId = req.user?.id;
    await movieService.create(newMovie, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    console.log(req.user);
    
    const movieId = req.params.movieId;

    // Get movie data for movieId
    const movie = await movieService.getOneWithCasts(movieId);
    // console.log(movie);

    console.log(movie.creator);
    console.log(req.user.id);

    //const isCreator = movie.creator && movie.creator?.toString() === req.user?.id;  //if creator is undefined it crash
    const isCreator = movie.creator?.equals(req.user?.id);
    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', isAuthorised, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({ exclude: movie.casts });

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', isAuthorised, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuthorised, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    if (!movie.creator?.equals(req.user?.id)) {
        res.setError('You are not the movie owner!')
        return res.redirect('/404');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuthorised, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    const categories = getCategoriesViewData(movie.category);
    //console.log(categories);
    
    res.render('movie/edit', { movie, categories } );
});

movieController.post('/:movieId/edit', isAuthorised, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    // TODO: Check if creator

    try {
        await movieService.update(movieId, movieData);
    } catch (err) {
        const categories = getCategoriesViewData(movieData.category);

        return res.render('movie/edit', { movie: movieData, categories, error: getErrorMessage(err)});
    }
    res.redirect(`/movies/${movieId}/details`);
});

function getCategoriesViewData(category) {
    let categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short Film',
    };

    const categories = Object.keys(categoriesMap).map(value => ({
        value: value, 
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }));

    return categories;
}

export default movieController;