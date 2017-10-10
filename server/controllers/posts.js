var Post = require('mongoose').model('Post');
const errorHandler = require('./error-handler');

module.exports = { 
    index(request, response){
        console.log('index request query??', request.query);
        Post.find(request.query)// get reuests have .query property (not .body)
            .then(posts => response.json(posts))
            .catch(errorHandler.bind(response))
    }, 
    show(request, response){
        Post.findById(request.params.id)
            .then(post => response.json(post))
            .catch(errorHandler.bind(response))
    },
    showRandom(request, response){
        Post.find().exec(function (err, results) {
          let count = results.length;
          let rand = Math.floor(Math.random()*count);
          Post.findOne({}).skip(rand)
            .then(post => response.json(post))
            .catch(errorHandler.bind(response))
        });
        
    },
    create(request, response){
        console.log('request body', request.body);
        Post.create(request.body)
            .then(post => response.json(post))
            .catch(errorHandler.bind(response))
    },
    update(request, response) {
        Post.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .then(post => response.json(post))
            .catch(errorHandler.bind(response));
    },
    destroy(request, response) {
        Post.findByIdAndRemove(request.params.id)
            .then(post => response.json(post))
            .catch(errorHandler.bind(response));
    },
}