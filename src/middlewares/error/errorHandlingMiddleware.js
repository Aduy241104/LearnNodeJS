const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    console.error("🔥 Lỗi:", err);

    // Nếu là lỗi được tạo bằng AppError → có statusCode
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
    }

    // Trường hợp error không có statusCode (VD: throw new Error(...))
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;
