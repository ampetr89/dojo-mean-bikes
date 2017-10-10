const router = require('express').Router();
const postController = require('../../controllers/posts');

module.exports = router
    .get('/', postController.index)
    .get('/random', postController.showRandom)
    .get('/:id', postController.show)
    .post('/', postController.create)
    .put('/:id', postController.update)
    .delete('/:id', postController.destroy);
