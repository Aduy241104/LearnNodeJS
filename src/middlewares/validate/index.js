const statusCode = require('http-status-codes');

const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[source], { abortEarly: false });

        if (error) {
            return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: "Validation error",
                errors: error.details.map(err => err.message),
            });
        }

        next();

    };
};

module.exports = validate;