const express = require('express');
const router = express.Router();
const Discussion = require('../model/discussion'); // Ensure the correct path to the model

// Get questions and answers for a specific batch
router.get('/discussion/:batch', async (req, res) => {
  try {
    const { batch } = req.params;
    console.log(`Fetching discussion for batch: ${batch}`);

    const discussion = await Discussion.findOne({ batch });

    if (!discussion) {
      console.log(`No discussion found for batch: ${batch}`);
      return res.status(404).send({ message: 'No discussion found for this batch' });
    }

    console.log(`Discussion found for batch: ${batch}`, discussion);
    res.status(200).send(discussion);
  } catch (error) {
    console.error('Error fetching discussion:', error);
    res.status(500).send({ message: 'Server error', error });
  }
});

// Add a new question
router.post('/discussion/:batch/question', async (req, res) => {
  try {
    const { batch } = req.params;
    const { question } = req.body;

    console.log(`Adding new question to batch: ${batch}`, question);

    let discussion = await Discussion.findOne({ batch });

    if (!discussion) {
      console.log(`No discussion found for batch: ${batch}, creating new discussion.`);
      discussion = new Discussion({ batch, questions: [] });
    }

    discussion.questions.push({ question, answers: [] });
    await discussion.save();

    console.log(`Question added to batch: ${batch}`, discussion);
    res.status(201).send(discussion);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).send({ message: 'Server error', error });
  }
});

// Add an answer to a specific question
router.post('/discussion/:batch/question/:questionId/answer', async (req, res) => {
  try {
    const { batch, questionId } = req.params;
    const { answer } = req.body;

    console.log(`Adding new answer to question ${questionId} in batch: ${batch}`, answer);

    const discussion = await Discussion.findOne({ batch });

    if (!discussion) {
      console.log(`No discussion found for batch: ${batch}`);
      return res.status(404).send({ message: 'No discussion found for this batch' });
    }

    const question = discussion.questions.id(questionId);

    if (!question) {
      console.log(`Question not found: ${questionId}`);
      return res.status(404).send({ message: 'Question not found' });
    }

    question.answers.push(answer);
    await discussion.save();

    console.log(`Answer added to question ${questionId} in batch: ${batch}`, discussion);
    res.status(201).send(discussion);
  } catch (error) {
    console.error('Error adding answer:', error);
    res.status(500).send({ message: 'Server error', error });
  }
});

module.exports = router;
