const getAllBooks = async (req, res, _next) => {
  res.send("list of all books");
};

const addNewBook = async (req, res, _next) => {
  console.log("Files", req.files);

  res.send("For adding new");
};

export { addNewBook, getAllBooks };
