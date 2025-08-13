const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read) {
    this.read = "read";
  } else {
    this.read = "not read yet";
  }

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((entry) => {
    console.log(entry.title);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("A Game of Thrones", "G.R.R Martin", 694, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 448, false);

const button = document.querySelector("#new-book-button");

button.addEventListener("click", (e) => {
  // make form visible
  document.querySelector(".form-popup").style.display = "block";
});
