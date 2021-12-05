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
      plainText:req.body.plainText,
      ipaText: req.body.ipaText
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
        Word.plainText = req.body.plainText;
        Word.ipaText = req.body.ipaText;
        console.log({ id: req.body.id }, {$set:Word});
        Word.updateOne({ id: req.body.id },{$set:Word})
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