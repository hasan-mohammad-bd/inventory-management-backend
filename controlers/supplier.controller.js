const { createSupplierService, getSuppliersService, getSupplierByIdService, updateSupplierService } = require("../services/supplier.service")

exports.createSupplier = async (req, res, next) => {

    try {
        const result = await createSupplierService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Successfully created the Supplier',
            data: result

        })
    } catch (error) {
       res.status(400).json({
        status: "fail",
        message: error.message
        
       }) 
    }
}

exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await getSuppliersService()
        res.status(200).json({
            status: 'success',
            data: suppliers

        })
    } catch (error) {
       res.status(400).json({
        status: "fail",
        error: error.message
       }) 
    }
}

exports.getSupplierById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const supplier = await getSupplierByIdService(id)

        if(!supplier){
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find the data"

            })
        }
        res.status(200).json({
            status: 'success',
            data: Supplier

        })
    } catch (error) {
       res.status(400).json({
        status: "fail",
        error: error.message
       }) 
    }
}

exports.updateSupplier = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await updateSupplierService(id, req.body)

        if(!result.modifiedCount){
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the Supplier with this id"

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