const { getStoresService, createStoreService, getStoreByIdService } = require("../services/store.service");




exports.getStore =  async (req, res)=> {
    try {
        const stores = await getStoresService();
        res.status(200).json({
            status: "success",
            data: stores
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't get the stores",
            error: error.message
        })
    }
}
exports.createStore =  async (req, res)=> {
    try {
        const result = await createStoreService(req.body);
        res.status(200).json({
            status: "success",
            data: "Store created successfully!"
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't create stores",
            error: error.message
        })
    }
}
exports.getStoreById =  async (req, res)=> {
    const {id} = req.params;
    try {
        const result = await getStoreByIdService(id);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't find the store",
            error: error.message
        })
    }
}