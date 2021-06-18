const express = require('express')

const PostController = require('../controllers/posts')

const auth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')

const router = express.Router()

router.post('', auth, extractFile, PostController.createPost)

router.put('/:id', auth, extractFile, PostController.updatePost)

router.get('', PostController.getPosts)

router.get('/:id', PostController.getPost)

router.delete('/:id', auth, PostController.deletePost)

module.exports = router