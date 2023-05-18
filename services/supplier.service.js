const Supplier = require('../models/Supplier');

exports.createSupplierService = async (data) => {

    const result = await Supplier.create(data);
    return result;
}

exports.getSuppliersService = async () => {
    const supplier = await Supplier.find({})
    return supplier;
}

exports.getSupplierByIdService = async (id) => {
    const supplier = await Brand.findOne({_id: id})
    return supplier;
}
exports.updateSupplierService = async (id,data) => {
    const result = await Brand.updateOne({_id: id}, data, {
        runValidators: true
    })
    return result;
}


