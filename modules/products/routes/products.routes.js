const getProductsController = require('../controllers/products.controllers'),
{ authenticate } = require('../../../configuration/config.jwt');
const upload = require('../../../configuration/config.multer'),
    productsImage = upload.upload(config.aws.s3.products);
const passport = require("passport");

module.exports = (app, version) => {
    let moduleName = '/products/';

    app.get(
        version + moduleName + "product-preload/" ,
        getProductsController.createProductPreLoad
    );

    app.get(
        version + moduleName + "product-details/:id" ,
        getProductsController.getProductsDetails
    );

    app.post(
        version + moduleName + "create-product" ,
        authenticate,
        productsImage.array('images', 20),
        getProductsController.createProduct
    );

    app.post(
        version + moduleName + "update-product" ,
        authenticate,
        getProductsController.updateProduct
    );

    app.post(
        version + moduleName + "upload-product-image" ,
        authenticate,
        productsImage.array('images', 1),
        getProductsController.uploadImage
    );

    app.delete(
        version + moduleName + "delete-product-image/:id" ,
        authenticate,
        getProductsController.deleteImage
    );

    app.delete(
        version + moduleName + "delete-product/:id" ,
        authenticate,
        getProductsController.deleteProduct
    );

    app.get(
        version + moduleName + "product-data/" ,
        getProductsController.getProducts
    );
}
