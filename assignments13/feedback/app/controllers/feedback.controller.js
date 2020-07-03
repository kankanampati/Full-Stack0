const Feedback = require("../models/feedback.model.js");

// Create and Save a new Feedback
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Feedback
  const feedback = new Feedback({
    name: req.body.name,
    password: req.body.password,
    feedback: req.body.feedback
  });

  // Save Feedback in the database
  Feedback.create(feedback, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Feedback."
      });
    else res.send(data);
  });
};

// Retrieve all Feedbacks from the database.
exports.findAll = (req, res) => {
  Feedback.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feedbacks."
      });
    else res.send(data);
  });
};

// Find a single Feedback with a feedbackId
exports.findOne = (req, res) => {
  Feedback.findById(req.params.feedbackId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Feedback with id ${req.params.feedbackId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Feedback with id " + req.params.feedbackId
        });
      }
    } else res.send(data);
  });
};

// Update a Feedback identified by the feedbackId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Feedback.updateById(
    req.params.feedbackId,
    new Feedback(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Feedback with id ${req.params.feedbackId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Feedback with id " + req.params.feedbackId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Feedback with the specified feedbackId in the request
exports.delete = (req, res) => {
  Feedback.remove(req.params.feedbackId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Feedback with id ${req.params.feedbackId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Feedback with id " + req.params.feedbackId
        });
      }
    } else res.send({ message: `Feedback was deleted successfully!` });
  });
};

// Delete all Feedbacks from the database.
exports.deleteAll = (req, res) => {
  Feedback.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all feedbacks."
      });
    else res.send({ message: `All Feedbacks were deleted successfully!` });
  });
};