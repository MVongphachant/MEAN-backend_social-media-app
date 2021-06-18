const Post = require('../models/post')

exports.createPost = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    })
    try {
        const createdPost = await post.save()
        res.status(201).json({
            message: 'Post added!',
            post: {
                id: createdPost._id,
                title: createdPost.title,
                content: createdPost.content,
                imagePath: createdPost.imagePath
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Creating a post failed!'
        })
    }
}

exports.updatePost = async (req, res, next) => {
    let imagePath = req.body.imagePath
    if (req.file) {
        const url = req.protocol + '://' + req.get('host')
        imagePath = url + '/images/' + req.file.filename
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    })
    try {
        const updatedPost = await Post.updateOne({
             _id: req.params.id, 
             creator: req.userData.userId 
            }, post)
        if (updatedPost.n > 0) {
            res.status(200).json({ message: 'Update successful' })
        } else {
            res.status(401).json({ message: 'Not authorized!' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Couldn\'t update post!'
        })
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        const pageSize = +req.query.pagesize
        const currentPage = +req.query.page
        const postQuery = Post.find()
        let fetchedPosts
        if (pageSize && currentPage) {
            postQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize)
        }
        postQuery.then(docs => {
            fetchedPosts = docs
            return Post.countDocuments()
        })
            .then(count => {
                res.status(200).json({
                    message: 'Posts sent!',
                    posts: fetchedPosts,
                    maxPosts: count
                })
        })
    } catch (error) {
        res.status(500).json({
            message: 'Fetching posts failed!'
        })
    }
}

exports.getPost =  async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'Post not found' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Fetching post failed!'
        })
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        if (updatedPost.n > 0) {
            res.status(200).json({ message: 'Delete successful!' })
        } else {
            res.status(401).json({ message: 'Not authorized!' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Fetching a post failed!'
        })
    }
}