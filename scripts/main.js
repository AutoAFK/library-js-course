const booksListDOM = document.querySelector("#books-list");
const addBookButtonDOM = document.querySelector("#add-button");

const dialogBookName = document.querySelector("#book-name");
const dialogBookAuthor = document.querySelector("#book-author");
const dialogBookPagesAmount = document.querySelector("#book-pages-amount");

const library = [];

function Book(name, author, numberOfPages) {
  if (!new.target) {
    throw Error("Cannot use this function without the 'new' keyword");
  }

  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.numberOfPages = numberOfPages;

  this.details = () =>
    `${this.name}, ${this.author}, ${this.numberOfPages} pages`;
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

    const removeButton = document.createElement("button");
    removeButton.dataset.id = book.id;
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn-remove");

    bookDOM.appendChild(removeButton);

    booksListDOM.appendChild(bookDOM);
  }
}

addBookButtonDOM.addEventListener("click", () => {
  const bookName = dialogBookName.value;
  const bookAuthor = dialogBookAuthor.value;
  const bookPagesAmount = dialogBookPagesAmount.value;

  addBookToLibrary(bookName, bookAuthor, bookPagesAmount);
  booksListDOM.innerHTML = "";
  displayBooks();
});

booksListDOM.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.classList.contains("btn-remove")) {
    return;
  }

  let index = 0;
  for (let length = library.length; index < length; index++) {
    if (library[index].id === target.dataset.id) {
      break;
    }
  }
  library.splice(index, 1);

  booksListDOM.innerHTML = "";
  displayBooks();
});

addBookToLibrary("Harry potter", "JK Rolling", 290);
addBookToLibrary("Court of Thorns and Roses", "Shara J. Maas", 500);
addBookToLibrary("The Housemaid", "Freida McFadden", 342);

displayBooks();
