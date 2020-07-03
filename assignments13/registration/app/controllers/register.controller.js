const Register = require("../models/register.model.js");

// Create and Save a new Register
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Register
  const register = new Register({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });

  // Save Register in the database
  Register.create(register, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Register."
      });
    else res.send(data);
  });
};

// Retrieve all Registers from the database.
exports.findAll = (req, res) => {
  Register.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registers."
      });
    else res.send(data);
  });
};

// Find a single Register with a registerId
exports.findOne = (req, res) => {
  Register.findById(req.params.registerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Register with id ${req.params.registerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Register with id " + req.params.registerId
        });
      }
    } else res.send(data);
  });
};

// Update a Register identified by the registerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Register.updateById(
    req.params.registerId,
    new Register(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Register with id ${req.params.registerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Register with id " + req.params.registerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Register with the specified registerId in the request
exports.delete = (req, res) => {
  Register.remove(req.params.registerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Register with id ${req.params.registerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Register with id " + req.params.registerId
        });
      }
    } else res.send({ message: `Register was deleted successfully!` });
  });
};

// Delete all Registers from the database.
exports.deleteAll = (req, res) => {
  Register.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all registers."
      });
    else res.send({ message: `All Registers were deleted successfully!` });
  });
};