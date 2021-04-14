const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

//get all the post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (error) {
    res.json({ message: error })
  }
})

//get specificpost
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch (error) {
    res.json({ message: error })
  }
})

//delete specificpost
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId })
    res.json(removedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

//update specificpost
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: { title: req.body.title },
      }
    )
    res.json(updatedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

//create a post
router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  })
  post
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }))
})

module.exports = router
