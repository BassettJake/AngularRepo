var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Word = require('../models/Word');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
  Word.find().then(Words => {
    res.status(200).json({
      message: "Words fetched successfully",
      words: Words
    });
  }).catch(error => {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
  });
});

router.post('/', (req, res, next) => {
    const maxWordId = sequenceGenerator.nextId("Words");
  
    const Word = new Word({
      id: maxWordId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    Word.save()
      .then(createdWord => {
        res.status(201).json({
          message: 'Word added successfully',
          Word: createdWord
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  router.put('/:id', (req, res, next) => {
    Word.findOne({ id: req.params.id })
      .then(Word => {
        Word.name = req.body.name;
        Word.description = req.body.description;
        Word.url = req.body.url;
  
        Word.updateOne({ id: req.params.id }, Word)
          .then(result => {
            res.status(204).json({
              message: 'Word updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Word not found.',
          error: { Word: 'Word not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Word.findOne({ id: req.params.id })
      .then(Word => {
        Word.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Word deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Word not found.',
          error: { Word: 'Word not found'}
        });
      });
  });