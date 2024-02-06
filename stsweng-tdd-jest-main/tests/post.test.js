const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
        
    });

    describe('update', () => {
        var updatePostStub;
    
        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });
    
        it('should return status 200 and the updated post object', () => {
            // Arrange
            const updatedPostData = {
                _id: '507asdghajsdhjgasd',
                title: 'Updated test post',
                content: 'Updated content',
                author: 'stswenguser',
                date: Date.now()
            };
    
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, updatedPostData);
    
            // Act
            PostController.update(req, res); 
    
            // Assert
            sinon.assert.calledWith(PostModel.updatePost);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json);
        });
    
        it('should return status 404 if the post to update is not found', () => {
            // Arrange
            const nonExistentPostId = 'invalidPostId';
    
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields({ error: 'Post not found' });
    
            // Act
            PostController.update(req, res); 
    
            // Assert
            sinon.assert.calledWith(PostModel.updatePost);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
        });
    });


    describe('findPost', () => {
        var findPostStub;
    
        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // executed after the test case
            findPostStub.restore();
        });
    
        it('should return status 200 and the found post object', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd';
            const foundPostData = {
                _id: postId,
                title: 'Found test post',
                content: 'Found content',
                author: 'stswenguser',
                date: Date.now()
            };
    
            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, foundPostData);
    
            // Act
            PostController.findPost(req, res); 
    
            // Assert
            sinon.assert.calledWith(PostModel.findPost);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json);
        });
    
        it('should return status 404 if the post is not found', () => {
            // Arrange
            const nonExistentPostId = 'invalidPostId';
    
            findPostStub = sinon.stub(PostModel, 'findPost').yields({ error: 'Post not found' });
    
            // Act
            PostController.findPost(req, res); 
    
            // Assert
            sinon.assert.calledWith(PostModel.findPost);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
        });
    
    });    
});