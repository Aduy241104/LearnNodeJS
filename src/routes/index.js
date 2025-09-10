
const productsRoute = require('./product.route');
const customersRoute = require("./customers.route");
const accountRoute = require("./account.route");
const ordersRoute = require('./orders.route');
const userRoute = require('./user.route');

function route(app) {

    app.use('/api/products', productsRoute);
    app.use("/api/customers", customersRoute);
    app.use('/api/accounts', accountRoute);
    app.use('/api/orders', ordersRoute);
    app.use('/api/user', userRoute);
}

module.exports = route;
