const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService } = require("../services/brand.services")

exports.createBrand = async (req, res, next) => {

    try {
        const result = await createBrandService(req.body)
        console.log(`this checking the result ${result}`);
        res.status(200).json({
            status: 'success',
            message: 'Successfully created the brand',
            data: result

        })
    } catch (error) {
       res.status(400).json({
        status: "fail",
        message: error.message
        
       }) 
    }
}

exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService()
        res.status(200).json({
            status: 'success',
            data: brands

        })
    } catch (error) {
       res.status(400).json({
        status: "fail",
        error: error.message
       }) 
    }
}

exports.getBrandById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const brand = await getBrandByIdService(id)

        if(!brand){
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find the data"

            })
        }
        res.status(200).json({
            status: 'success',
            data: brand

        })
    } catch (error) {
       res.status(400).json({
        status: "fail",
        error: error.message
       }) 
    }
}

exports.updateBrand = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await updateBrandService(id, req.body)

        if(!result.modifiedCount){
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the brand with this id"

            });
        }
        res.status(200).json({
            status: 'success',
            data: result

        })
    } catch (error) {
       res.status(400).json({
        status: "fail",
        error: error.message
       }) 
    }
}