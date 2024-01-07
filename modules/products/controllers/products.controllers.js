const Response = require('../../../configuration/config.response');
bcrypt = require('bcrypt'),
    { PrismaClient } = require('@prisma/client'),
    Prisma = new PrismaClient(),
    { sendEmail } = require("../../../configuration/config.mailer");

const createProductPreLoad = async (req, res, next) => {
    try {
        const categories = await Prisma.category.findMany({
            where:{
                status: true
            }
        })

        const brands = await Prisma.brand.findMany({
            where:{
                status: true
            }
        })

        return Response.sendResponse(
            res, {
            msg: '326',
            data: {
                categories,
                brands
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const createProduct = async (req, res, next) => {
    try {
        if (!req.body.name) {
            return next({ msg: 100});
        } if (!req.body.year) {
            return next({ msg: 101});
        } if (!req.body.milage) {
            return next({ msg: 102});
        } if (!req.body.price) {
            return next({ msg: 103});
        }
        
        console.log(req.files)
        const images = req.files.map((image) => {
            return {
                image: image.location,
                status: true
            }
        })
        const product = await Prisma.product.create({
            data:{
                category_id: parseInt(req.body.category_id),
                brand_id: parseInt(req.body.brand_id),
                name: req.body.name,
                year: req.body.year,
                milage: parseInt(req.body.milage),
                exteriorColor: req.body.exteriorColor,
                interiorColor: req.body.interiorColor,
                driveType: req.body.driveType,
                engine: req.body.engine,
                bodyType: req.body.bodyType,
                transmission: req.body.transmission,
                description: req.body.description,
                detaildescription: req.body.detaildescription,
                price: parseFloat(req.body.price),
                status: true,
                images: {
                    create: images
                }
            }
        })

        return Response.sendResponse(
            res, {
            msg: '320',
            data: {
                product:product
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const updateProduct = async (req, res, next) => {
    try {
        const product = await Prisma.product.update({
            where: {
                id: parseInt(req.body.id)
            },
            data:{
                category_id: parseInt(req.body.category_id),
                brand_id: parseInt(req.body.brand_id),
                name: req.body.name,
                year: req.body.year,
                milage: parseInt(req.body.milage),
                exteriorColor: req.body.exteriorColor,
                interiorColor: req.body.interiorColor,
                driveType: req.body.driveType,
                engine: req.body.engine,
                bodyType: req.body.bodyType,
                transmission: req.body.transmission,
                description: req.body.description,
                detaildescription: req.body.detaildescription,
                price: parseFloat(req.body.price)
            }
        })

        return Response.sendResponse(
            res, {
            msg: '321',
            data: {
                product:product
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const uploadImage = async (req, res, next) => {
    try {
        const image = await Prisma.images.create({
            data:{
                image: req.files[0].location,
                product_id: parseInt(req.body.product_id)
            }
        })

        return Response.sendResponse(
            res, {
            msg: '322',
            data: {
                image:image
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const deleteImage = async (req, res, next) => {
    try {
        const image = await Prisma.images.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })

        return Response.sendResponse(
            res, {
            msg: '323',
            data: {
                
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const getProductsDetails = async (req, res, next) => {
    try {
        const product = await Prisma.product.findUnique({
            where: {
                id:parseInt(req.params.id)
            },
            include:{
                category:true,
                brand:true,
                images:true
            }
        })
        return Response.sendResponse(
            res, {
            msg: '324',
            data: {
                product:product
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Prisma.product.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })

        return Response.sendResponse(
            res, {
            msg: '325',
            data: {
                
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}

const getProducts = async (req, res, next) => {
    try {
        const product = await Prisma.product.findMany({
            include:{
                category:true,
                brand:true,
                images:true
            }
        })
        return Response.sendResponse(
            res, {
            msg: '327',
            data: {
                product:product
            },
            lang: req.params.lang
        });

    } catch (err) {
        console.log(err);
        return next({ msg: 3067 });
    }

}


module.exports = {
    createProductPreLoad,
    createProduct,
    updateProduct,
    uploadImage,
    deleteImage,
    getProductsDetails,
    deleteProduct,
    getProducts
};