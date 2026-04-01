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

    const bookContainer = document.createElement("div");

    const bookDetailsParagraph = document.createElement("p");
    bookDetailsParagraph.classList.add("book-details");
    bookDetailsParagraph.textContent = book.details();

    bookContainer.appendChild(bookDetailsParagraph);

    const checkmarkContainer = document.createElement("div");
    checkmarkContainer.classList.add(book.read ? "read" : "unread");
    const checkmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`
    checkmarkContainer.innerHTML = checkmark;

    bookContainer.appendChild(checkmarkContainer);

    bookDOM.appendChild(bookContainer);

    const divButtons = document.createElement("div");

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = !book.read ? "Read" : "Unread";
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
      book.toggleRead();
      break;
    }
  }
  refreshBooksList();
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
  // Parent node have to be introduced twice to get to the li.
  // The first time it goes to the div above.
  const bookID = target.parentNode.parentNode.dataset.id;
  console.log(bookID)

  if (target.classList.contains("btn-remove")) {
    removeBookFromLibrary(bookID);
  } else if (target.classList.contains("btn-read")) {
    toggleBookRead(bookID);
  }
});

addBookToLibrary("Harry potter", "JK Rolling", 290);
addBookToLibrary("Court of Thorns and Roses", "Shara J. Maas", 500);
addBookToLibrary("The Housemaid", "Freida McFadden", 342);

