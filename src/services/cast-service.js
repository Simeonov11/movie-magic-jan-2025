import Cast from "../models/Cast.js";

export default {
    getAll(filter = {}) {
        let query = Cast.find({});

        if (filter.exclude) {
            // query = query.find({_id: {$nin: filter.exclude}});   // one way / MongoDB way
            query = query.nin('_id', filter.exclude);   // second way / Mongoose way
        }
        return query;
        // return Cast.find({});
    },
    create(castData) {
        // TODO: Create cast
        return Cast.create(castData);
    }
}