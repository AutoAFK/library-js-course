const library = [];

function Book(name, author, numberOfPages) {
    if(!new.target){
        throw Error("Cannot use this function without the 'new' keyword");
    }

    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
}

function addBookToLibrary(name,author,numberOfPages){
    const book = new Book(name,author,numberOfPages);
    library.push(book);
}
