const { body, validationResult } = require("express-validator");

const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title should not exceed 100 characters"),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 2000 })
    .withMessage("Content should not exceed 2000 characters"),
  body("author")
    .notEmpty()
    .withMessage("Author should not be empty")
    .isLength({ max: 100 })
    .withMessage("Author should not exceed 100 characters"),
    
  //middleware to validate input fields
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validatePost };
