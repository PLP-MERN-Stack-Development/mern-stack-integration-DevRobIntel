import express from 'express';
import postController from '../controllers/postController.js';  // Default import
import { validatePost } from '../middleware/validate.js';

const router = express.Router();

// CORRECT: postController.getPosts (from default export object)
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', validatePost, postController.createPost);
router.put('/:id', validatePost, postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;