const booksListDOM = document.querySelector("#books-list");
const library = [];

function Book(name, author, numberOfPages) {
  if (!new.target) {
    throw Error("Cannot use this function without the 'new' keyword");
  }

  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.numberOfPages = numberOfPages;
  
  this.details = () => `${this.name}, ${this.author}, ${this.numberOfPages} pages`;
}

function addBookToLibrary(name, author, numberOfPages) {
  const book = new Book(name, author, numberOfPages);
  library.push(book);
}

function displayBooks() {
  for (const book of library) {
    const bookDOM = document.createElement("li");
    bookDOM.classList.add("book");

    const bookDetailsParagraph = document.createElement("p");
    bookDetailsParagraph.classList.add("book-details");
    bookDetailsParagraph.textContent = book.details();

    bookDOM.appendChild(bookDetailsParagraph);

    booksListDOM.appendChild(bookDOM);
  }
}

addBookToLibrary("Harry potter", "JK Rolling", 290);
addBookToLibrary("Court of Thorns and Roses", "Shara J. Maas", 500);
addBookToLibrary("The Housemaid", "Freida McFadden", 342);

displayBooks();