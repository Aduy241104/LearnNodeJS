class productsController {
    productList = [
        {
            "id": 1,
            "name": "Xe điều khiển"
        },
    ]

    index(req, res) {
        res.send(this.productList)
    }

    addNewProduct = (req, res) =>  {
        if (Object.keys(req.body).length > 0) {
            this.productList.push(req.body);
            res.send(this.productList)
        } else {
            res.status(500).send({
                message: "khong hop le"
            })
        }
    }
}

module.exports = new productsController();