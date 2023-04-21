const { Author } = require('../db/models/authorModel');
const HttpError = require('../helpers/httpError');
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
  const author = await Author.findById(id);
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
  const excludedFields = {
    createdAt: 0,
    updatedAt: 0,
    owner: 0,
  };
  const { email } = req.body;
  // checking emails for unique
  const author = await Author.findOne({ email });
  if (author) {
    throw HttpError(409, 'Email already exists');
  }
  const newAuthor = await Author.create({ ...req.body, owner }, excludedFields);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: newAuthor,
  });
};
const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  const deletedAuthor = await Author.findByIdAndRemove(id);
  if (!deletedAuthor) {
    throw HttpError(404);
  }

  res.json({ message: 'Deleted success' });
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
};
