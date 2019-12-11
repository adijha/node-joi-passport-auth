const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Get the apecific post
router.get('/:code', async (req, res) => {
	try {
		const post = await Post.findById(req.params.code);
		res.json(post);
	} catch (error) {
		res.json(error);
	}
});
//Delete the apecific post
router.delete('/:code', async (req, res) => {
	try {
		const post = await Post.remove({ _id: req.params.code });
		res.json('Post Deleted Successfully');
	} catch (error) {
		res.json(error);
	}
});

//Update post
router.patch('/:code', async (req, res) => {
	try {
		await Post.updateOne({ _id: req.params.code }, { $set: { title: req.body.title } });
		res.json({ message: 'POst updated Successfilly' });
	} catch (error) {
		res.json({ message: error.message });
	}
});

//Get all the posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json(err);
	}
});
//Save the incoming post
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description
	});
	try {
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (error) {
		res.json({ message: error });
	}
});

module.exports = router;
