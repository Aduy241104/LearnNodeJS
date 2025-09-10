const Orders = require('../models/orders');


const mongoose = require("mongoose");

const getOrders = async (req, res) => {
    try {
        // ✅ Đặt accountId mặc định
        const DEFAULT_ACCOUNT_ID = "68ba5594e999581b62e93a69";

        // Nếu người dùng có truyền accountId thì dùng, còn không thì dùng mặc định
        const accountId = req.query.accountId || DEFAULT_ACCOUNT_ID;

        // ✅ Kiểm tra ObjectId hợp lệ
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            return res.status(400).json({
                success: false,
                message: "accountId không hợp lệ"
            });
        }

        // ✅ Tìm đơn hàng theo accountId
        const result = await Orders.find({
            accountId: new mongoose.Types.ObjectId(accountId)
        });

        // ✅ Nếu không tìm thấy đơn hàng nào
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng nào cho accountId này"
            });
        }

        // ✅ Trả kết quả
        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server"
        });
    }
};


const getOrderByAccountId = async (req, res) => {
    try {
        const orderId = req.query.orderId;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error("account id khon hop le");
        }

        const result = await Orders.findById(orderId).populate("accountId", "username email role");

        res.send(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const getOrderByAccountId2 = async (req, res) => {
    try {
        const orderId = req.query.orderId;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error("account id khon hop le");
        }

        const result = await Orders.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderId)
                }
            },
            {
                $lookup: {
                    from: 'account',
                    localField:'accountId',
                    foreignField: '_id',
                    as: 'accountss'
                }
            }
        ])

        res.send(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const insertSampleOrders = async (req, res) => {
    try {
        // accountId có sẵn trong DB
        const accountId = "68ba5594e999581b62e93a69";

        // Convert sang ObjectId hợp lệ
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            return res.status(400).json({ message: "accountId không hợp lệ" });
        }

        const sampleOrders = [
            {
                accountId: new mongoose.Types.ObjectId(accountId),
                orderDate: new Date("2024-08-18T15:30:00Z"),
                status: "completed",
                items: [
                    { productName: "Keyboard", price: 80, quantity: 1 },
                    { productName: "Monitor", price: 300, quantity: 1 }
                ],
                totalAmount: 380
            },
            {
                accountId: new mongoose.Types.ObjectId(accountId),
                orderDate: new Date("2024-09-02T10:15:00Z"),
                status: "pending",
                items: [
                    { productName: "Mouse", price: 20, quantity: 2 },
                    { productName: "Headset", price: 120, quantity: 1 }
                ],
                totalAmount: 160
            },
            {
                accountId: new mongoose.Types.ObjectId(accountId),
                orderDate: new Date("2024-09-05T09:00:00Z"),
                status: "shipped",
                items: [
                    { productName: "Laptop", price: 1200, quantity: 1 }
                ],
                totalAmount: 1200
            }
        ];

        // Insert vào MongoDB
        await Orders.insertMany(sampleOrders);

        res.status(201).json({
            success: true,
            message: "Thêm dữ liệu mẫu thành công",
            inserted: sampleOrders.length
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};


module.exports = {
    getOrders,
    insertSampleOrders,
    getOrderByAccountId,
    getOrderByAccountId2
}