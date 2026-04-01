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
  this.read = false;

  this.details = () =>
    `${this.name}, ${this.author}, ${this.numberOfPages} pages`;

  this.toggleRead = () => {
    this.read = !this.read;
  };
}

function addBookToLibrary(name, author, numberOfPages) {
  const book = new Book(name, author, numberOfPages);
  library.push(book);

  refreshBooksList();
}

function displayBooks() {
  for (const book of library) {
    const bookDOM = document.createElement("li");
    bookDOM.dataset.id = book.id;
    bookDOM.classList.add("book");

    const bookDetailsParagraph = document.createElement("p");
    bookDetailsParagraph.classList.add("book-details");
    bookDetailsParagraph.textContent = book.details();

    bookDOM.appendChild(bookDetailsParagraph);

    const divButtons = document.createElement("div");

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Read";
    toggleReadButton.classList.add("btn-read");

    divButtons.appendChild(toggleReadButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn-remove");

    divButtons.appendChild(removeButton);

    bookDOM.appendChild(divButtons);

    booksListDOM.appendChild(bookDOM);
  }
}

function refreshBooksList() {
  booksListDOM.innerHTML = "";
  displayBooks();
}

function toggleBookRead(id) {
  for (const book of library) {
    if (book.id === id) {
      book.toogleRead();
      return;
    }
  }
}

function removeBookFromLibrary(id) {
  let index = 0;
  for (let length = library.length; index < length; index++) {
    if (library[index].id === id) {
      break;
    }
  }
  library.splice(index, 1);
  refreshBooksList();
}

addBookButtonDOM.addEventListener("click", () => {
  const bookName = dialogBookName.value;
  const bookAuthor = dialogBookAuthor.value;
  const bookPagesAmount = dialogBookPagesAmount.value;

  addBookToLibrary(bookName, bookAuthor, bookPagesAmount);
});

booksListDOM.addEventListener("click", (event) => {
  const target = event.target;
  const bookID = target.parentNode.dataset.id;

  if (target.classList.contains("btn-remove")) {
    removeBookFromLibrary(bookID);
  } else if (target.classList.contains("btn-read")) {
    toggleBookRead(bookID);
  }
});

addBookToLibrary("Harry potter", "JK Rolling", 290);
addBookToLibrary("Court of Thorns and Roses", "Shara J. Maas", 500);
addBookToLibrary("The Housemaid", "Freida McFadden", 342);

displayBooks();
