import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import 'dotenv/config';

import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';

const app = express();

// db configuration
try {
    const defaultUri = 'mongodb://127.0.0.1:27017/magic-movies-jan2025';
    await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);

    console.log('DB Connected sucessfully!');
} catch (err) {
    console.log('Cannot connect to DB');
    console.log(err.message);
}

// handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper,
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// express configuration
app.use('/static', express.static('src/public')); // set path: 'static' for css request with path static/css/style.css to search instead in public
app.use(express.urlencoded({ extended: false })); // Learn express to parse form data

// setup routes
app.use(routes);

// start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));