const Joi = require("joi");
const httpCodes = require("http-status-codes");

const getOrdersByStatus = (req, res, next) => {

}

const validateOrderFilterOrders = Joi.object({

});

const getOrderQuerySchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            "string.base": "ID phải là chuỗi",
            "any.required": "ID là bắt buộc",
            "string.empty": "ID không được để trống"
        }),
    status: Joi.string()
        .valid("pending", "completed", "canceled")
        .optional()
        .messages({
            "string.base": "Status phải là một chuỗi",
            "any.only": "Status chỉ chấp nhận các giá trị: pending, completed, canceled"
        })
});


const createAccountSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            "string.empty": "username can not blank"
        }),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    role: Joi.string()
});


module.exports = {
    getOrdersByStatus,
    getOrderQuerySchema,
    createAccountSchema
}
