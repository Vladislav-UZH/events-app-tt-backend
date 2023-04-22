const { Author } = require('../db/models/authorModel');
const { HttpError } = require('../helpers');
// controllers of getting  authors
const getAllAuthors = async (req, res) => {
  const { _id: owner } = req.user;
  // pagination
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  // request for get authors
  const authors = await Author.find(
    { owner },
    '-createdAt -updatedAt -owner ',
    {
      skip,
      limit,
    }
  );
  if (!authors) {
    throw HttpError(404);
  }
  res.json({
    status: 'success',
    code: 200,
    data: authors,
  });
};
const getAuthorById = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id).select('-createdAt -updatedAt');
  if (!author) {
    throw HttpError(404);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: author,
  });
};

// controllers of setting authors
const createAuthor = async (req, res) => {
  const { _id: owner } = req.user;
  const { email } = req.body;
  // checking emails for unique

  const author = await Author.findOne({ email });
  if (author) {
    throw HttpError(409, 'Email already exists');
  }
  // creating
  const newAuthor = await Author.create({ ...req.body, owner });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: newAuthor,
  });
};
//
const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  const deletedAuthor = await Author.findByIdAndRemove(id);
  if (!deletedAuthor) {
    throw HttpError(404);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Deleted success',
  });
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
};
