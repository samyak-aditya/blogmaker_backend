import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";


export const getPosts = async (req,res) => {
  try {
    const postMessage= await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (error) {

    res.status(404).json({message: error.message});
    
  }
}

export const deletePost =async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return req.res.status(404).send('No post with that id');

  await PostMessage.findByIdAndRemove(id);
  res.json({message: "Post deleted successfully"});
}


export const createPost = async(req,res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
  
  
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const likePost= async (req, res) => {
    const {id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatePost = await PostMessage.findByIdAndUpdate(id, {likeCount:post.likeCount +1} , {new : true})

    res.json (updatePost)

}