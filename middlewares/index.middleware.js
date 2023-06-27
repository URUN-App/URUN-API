const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(404).json({
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg
            }))
        })
    }

    next();
}