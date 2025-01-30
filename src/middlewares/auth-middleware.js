import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

// this middleware is executing on every request
export const authMiddleware = (req, res, next) => {
    console.log(req.url);

    // Get token
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }
    
    // Validate token
    try {
        const decodedToken = jwt.verify(token, SECRET);

        // Attach decoded token to request
        req.user = decodedToken;
        res.locals.user = decodedToken; // Handlebars search locals and give locals info to the context of every view on rendering. Every template will have access to the user automaticaly

        next();
    } catch (err) {
        console.log(err.messate);
        // If Invalid token
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

// This middleware to work when user is not authorised ( GoTo: movieControler, restricted actions as the create, edit, delete )
export const isAuthorised = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
};