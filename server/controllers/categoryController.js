import Category from "../models/Category.js";

export const createOneCategory = async (req, res) => {
    const { title } = req.body;
    if (!title)
        return res.status(400).json({ message: "all fields are required" });
    try {
        const category = await Category.create({title});
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getOneCategory = async (req, res) => {
    const categoryID = req.params.categoryId;
    
    try {
        const category = await Category.findById(categoryID);
        if (!category)
            return res.status(404).json({ message: "category not found" });

        res.status(200).json( category );
    } catch (err) {
        res.status(500).json({ message: "couldnt get category" });
    }
};

export const deleteOneCategory = async (req, res) => {
    const categoryID = req.params.categoryId;
    try {
        const foundCategory = await Category.findByIdAndDelete(categoryID);
        if (!foundCategory)
            return res.status(404).json({ message: "category not found" });
        res.sendStatus(202);
    } catch (err) {
        res.status(500).json({ message: "couldnt delete category" });
    }
};

export const updateOneCategory = async (req, res) => {
    const categoryID = req.params.categoryId;
    const { title} = req.body;
    if (!title )
        return res.status(400).json({ message: "all fields are required" });
    try {
        const category = await Category.findByIdAndUpdate(categoryID, {
            title,
        });
        if (!category)
            return res.status(404).json({ message: "category not found" });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).json({ message: "coudlnt update category" });
    }
};
export const getAllCategories = async (req, res) => {
    
    try {
        const categories = await Category.find();
        res.status(200).json(categories );
    } catch (err) {
        res.status(500).json({ message: "cant retrieve all categories" });
    }
};
