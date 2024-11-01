const POST = require("../models/Post");

const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10, sort = "createdAt", author } = req.query;

  //filter query
  const filter = author ? { author } : {};
  try {
    const posts = await POST.find(filter)
      .sort(sort)
      .skip((page - 1) * limit) //skip documents baed on the page number
      .limit(limit); //limit number of documents returned

    //cal total pages
    const totalPosts = await POST.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);
    res.status(200).send({
      posts: posts || [],
      totalPages,
      totalPosts,
      currentPage: Number(page),
    });
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};

const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new POST({ title, content, author });
    await newPost.save();

    res.status(201).send(newPost);
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await POST.findById(id);
    if (!post) return res.status(404).send({ message: "Not Found" });
    res.send(200, post);
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await POST.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true } //return document
    );
    if (!updatedPost) return res.status(400).send({ message: "Not Found" });
    res.send(200, updatedPost);
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await POST.findByIdAndDelete(id);
    if (!deletedPost) return res.send(404, "Not Found");
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    next(error); //passes the error to the error handler
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
};
