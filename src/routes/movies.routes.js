const express  = require('express');
const validationHandler = require('../middlewares/validationHandler');
const MoviesService = require('../services/movies');
const {createMovieSchema, updateMovieSchema,movieIdSchema} = require('../utils/schemas/movie');


function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();
  
    router.get('/', async function(req, res, next) {
      const { tags } = req.query;
      try {

        const movies = await moviesService.getMovies({ tags });
  
        res.status(200).json({
          data: movies,
          message: 'movies listed'
        });
      } catch (err) {
        next(err);
      }
    });
  
    router.get('/:id',validationHandler({ id: movieIdSchema }, 'params') ,async function(req, res, next) {
      const { id } = req.params;
      try {
        const movies = await moviesService.getMovie({ id });
  
        res.status(200).json({
          data: movies,
          message: 'movie retrieved'
        });
      } catch (err) {
        next(err);
      }
    });
  
  
    router.post('/', validationHandler(createMovieSchema),async function(req, res, next) {
      const { body: movie } = req;
      try {
        const createdMovieId = await moviesService.createMovie({ movie });
  
        res.status(201).json({
          data: createdMovieId,
          message: 'movie created'
        });
      } catch (err) {
        next(err);
      }
    });
  
  
    router.put('/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),async function(req, res, next) {
      const { id } = req.params;
      try {
        const updatedMovieId = await moviesService.updateMovie({
          id,
          movie
        });
  
        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated'
        });
      } catch (err) {
        next(err);
      }
    });
  
    router.delete('/:id',validationHandler({ id: movieIdSchema }, 'params'),async function(req, res, next) {
      const { id } = req.params;
      try {
        const deletedMovieId = await moviesService.deleteMovie({ id });
  
        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted'
        });
      } catch (err) {
        next(err);
      }
    });
  }
  
  module.exports = moviesApi;