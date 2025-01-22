import { Router } from 'express';
import movieService from '../services/movie-service.js';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await movieService.getAll(); 

    // Problem: Handlebars: Access has been denied to resolve the (all) property "imageUrl" because it is not an "own property" of its parent.
    // if you work with Documents you can use DB methods save, updata ... if you work with plain object you loose the documents methods and can not save, update ...
    
    // (Option 1):
    // add lean to movieService.getAll().lean() is Query method Converts documents to plain objects 

    // (Option 2):
    // Convert documents to plain objects
    // const plainMovies = movies.map(m => m.toObject());

    // Curently using option 3
    // (Option 3): Set to handlebars runtimeOptions allowProtoPropertiesByDefault: true, and you can work with documents and objects (problem is in the prototipes in the documents)

    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;