const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Category Not Found"
            });
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not Able to Save Category in DB"
            })
        }
        res.json({ category });
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No categories found"
            });
        }
        res.json(categories);
    });
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    //The below line is responsible to grab the 
    //name which we have send from the frontend or from the postman
    category.name = req.body.name;
    category.save((err, updatedcategory) => {
        if (err) {
            return res.status(400).json({
                error: "Updatation Failed"
            });
        }
        res.json(updatedcategory)
    });
}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: `Unable to remove Category ${category}`
            })
        }
        res.json({
            message: `able to remove Category ${category}`
        })
    })
}

