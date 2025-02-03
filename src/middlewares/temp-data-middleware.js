export const tempData = (req, res, next) => {
    // Attach error setter to res
    res.setError = (message) => {
        req.session.error = {
            message,
            isFirsRequest: true,
        }
    }

    if (!req.session.error) {
        return next();
    }


    // read error and set to resonse
    if(req.session.error.isFirsRequest) {
        req.session.error.isFirsRequest = false;
        res.locals.error = req.session.error.message;
    } else {
        req.session.error = null;
    }
    
    next();
};