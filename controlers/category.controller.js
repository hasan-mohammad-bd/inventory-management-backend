const { get } = require("mongoose");
const { getCategoriesService, createCategoryService } = require("../services/category.service");


exports.getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService();
        res.status(200).json({
            status: "success",
            data: categories
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the categories",
            error: error.message
        })
    }
}

exports.createCategory = async (req, res) => {
    console.log(req.body);
    try {
        const categories = await createCategoryService(req.body);
        res.status(200).json({
            status: "success",
            data: categories
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't create the category",
            error: error.message
        })
    }
}