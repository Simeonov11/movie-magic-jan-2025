import Movie from '../models/Movie.js';

export default {
    getAll(filter = {}) {
        let query = Movie.find({}); 

        if (filter.search) {
            // TODO: add case insensitive search
            query = query.where({ title: filter.search })
        }

        if (filter.genre) {
            // TODO: add case insensitive search
            query = query.where({ genre: filter.genre });
        }

        if (filter.year) {
            query = query.where({ year: Number(filter.year) });
        }

        return query;
    },
    getOne(movieId) {
        const result = Movie.findById(movieId);

        return result;
    },
    getOneWithCasts(movieId) {
        return this.getOne(movieId).populate('casts'); // populate the movie object from DB including the full array of objects for the casts ID's (see movie-controller console.log(movie))
    },
    create(movieData, creatorId) {
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating), // re-assign new value for rating
            year: Number(movieData.year),
            creator: creatorId,
        });

        return result;
    },
    attachCast(movieId, castId) {
    
        // // Attach #1 way
        // const movie = await Movie.findById(movieId);
        // // Check if castId is not added already
        // if (movie.casts.includes(castId)) {
        //     return;
        // }
        // movie.casts.push(castId);
        // await movie.save();

        // return movie;


        // Attach #2 way
        // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });  // MongoDB way
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    }
}