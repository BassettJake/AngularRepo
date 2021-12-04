var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Word = require('../models/word');
var router = express.Router();
module.exports = router; 

router.get('/', (req, res, next) => {
    Word.find().populate('group').then(words => {
      res.status(200).json({
        message: "word fetched successfully",
        words: words
      });
    }).catch(error => {
      res.status(500).json({
          message: 'An error occurred',
          error: error
      });
    });
  });
  
  router.post('/', (req, res, next) => {
      const maxWordId = sequenceGenerator.nextId("words");
    
      const word = new Word({
        id: maxWordId,
        plainText: req.body.plainText,
        ipaText: req.body.ipaText,
      });
    
      word.save()
        .then(createdWord => {
          res.status(201).json({
            message: 'Word added successfully',
            word: createdWord
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
        .then(word => {
          word.plainText = req.body.plainText;
          word.ipaText = req.body.ipaText;
          Word.updateOne({ id: req.params.id }, word)
            .then(result => {
              res.status(204).json({
                message: 'Word updated successfully'
              })
            })
            .catch(error => {
               res.status(500).json({
               message: 'An error occurred',
               error: "|" + error
             });
            });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Word not found.',
            error: { word: 'Word not found'}
          });
        });
    });
  
    router.delete("/:id", (req, res, next) => {
      Word.findOne({ id: req.params.id })
        .then(word => {
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
            error: { word: 'Word not found'}
          });
        });
    });