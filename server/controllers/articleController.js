import Article from "../models/Article.js";

export const createOneArticle = async (req, res) => {
    const { title, content, categories } = req.body;
    if (!title || !content || !categories)
        return res.status(400).json({ message: "all fields are required" });
    try {
        const article = await Article.create({ title, categories, content });
        res.status(200).json({ article });
    } catch (err) {
        res.status(500).json({ message: "couldnt create article" });
    }
};
export const getOneArticle = async (req, res) => {
    const articleID = req.params.articleId;
    try {
        const article = await Article.findById(articleID);
        if (!article)
            return res.status(404).json({ message: "article not found" });

        res.status(200).json({ article });
    } catch (err) {
        res.status(500).json({ message: "couldnt get article" });
    }
};

export const deleteOneArticle = async (req, res) => {
    const articleID = req.params.articleId;
    try {
        const foundArticle = await Article.findByIdAndDelete(articleID);
        if (!foundArticle)
            return res.status(404).json({ message: "article not found" });
        res.sendStatus(202);
    } catch (err) {
        res.status(500).json({ message: "couldnt delete article" });
    }
};

export const updateOneArticle = async (req, res) => {
    console.log(req)
    const articleID = req.params.articleId;
    const { title, categories, content } = req.body;
    if (!title || !categories || !content)
        return res.status(400).json({ message: "all fields are required" });
    try {
        const article = await Article.findByIdAndUpdate(articleID, {
            title,
            categories,
            content,
        });
        if (!article)
            return res.status(404).json({ message: "article not found" });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).json({ message: "coudlnt update article" });
    }
};
export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({ articles });
    } catch (err) {
        res.status(500).json({ message: "cant retrieve all articles" });
    }
};
