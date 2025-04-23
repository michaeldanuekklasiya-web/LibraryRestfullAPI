const isDefined = (value) => {
  return value !== undefined && value !== null && value !== "";
};

const formatUserData = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

const formatBookData = (book) => {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    date: book.date,
    category: book.category,
    image: book.image,
    description: book.description,
    publisher: book.publisher,
    year_published: book.year_published,
    page_count: book.page_count,
    format: book.format,
    doi: book.doi,
  };
};

const formatCollectionData = (collection) => {
  return {
    book_id: collection.id,
    book_title: collection.title,
    book_author: collection.author,
    book_category: collection.category,
    book_date: collection.date,
  };
};

const formatPagination = (total_record, page, limit) => {
  const total_pages = Math.ceil(total_record / limit);
  return {
    total_record,
    page,
    limit,
    total_pages,
  };
};

export { isDefined, formatUserData, formatBookData, formatPagination, formatCollectionData };
