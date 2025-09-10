const AccountModel = require('../models/accounts');

const createAccount = async (data) => {
    try {

        const newAccount = { ...data };

        let checkExists = await AccountModel.exists({ email: data.email });

        if (checkExists) {
            throw new Error("email đã tồn tại")
        }

        await AccountModel.create(newAccount);

        return {
            success: true,
            message: "Tạo tài khoản thành công",
            account: newAccount,
        }
    } catch (error) {
        return {
            success: false,
            message: "Lỗi khi tạo tài khoản",
            error: error.message,
        }
    }
}


module.exports = {
    createAccount
}