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

  const tableBody = document.querySelector(".table-body");
  const tableRow = document.createElement("tr");
  const tableTitle = document.createElement("td");
  const tableAuthor = document.createElement("td");
  const tablePages = document.createElement("td");
  const tableRead = document.createElement("td");
  const deleteButton = document.createElement("button");

  tableTitle.textContent = title;
  tableAuthor.textContent = author;
  tablePages.textContent = pages;
  tableRead.textContent = book.read;

  deleteButton.textContent = "Delete";
  deleteButton.classList = "delete-book";
  deleteButton.dataset.id = book.id;

  tableRow.appendChild(tableTitle);
  tableRow.appendChild(tableAuthor);
  tableRow.appendChild(tablePages);
  tableRow.appendChild(tableRead);
  tableRow.appendChild(deleteButton);
  tableBody.appendChild(tableRow);
}

function displayBooks() {
  const tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = "";
  myLibrary.forEach((entry) => {
    const tableRow = document.createElement("tr");
    const title = document.createElement("td");
    const author = document.createElement("td");
    const pages = document.createElement("td");
    const read = document.createElement("td");
    const deleteButton = document.createElement("button");

    title.textContent = entry.title;
    author.textContent = entry.author;
    pages.textContent = entry.pages;
    read.textContent = entry.read;

    deleteButton.textContent = "Delete";
    deleteButton.classList = "delete-book";
    deleteButton.dataset.id = entry.id;

    tableRow.appendChild(title);
    tableRow.appendChild(author);
    tableRow.appendChild(pages);
    tableRow.appendChild(read);
    tableRow.appendChild(deleteButton);
    tableBody.appendChild(tableRow);
  });
}

function deleteBook(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary.splice(i, 1);
      const bookRow = document.querySelector(`[data-id="${id}"]`);
      document.querySelector("table").deleteRow(bookRow.parentNode.rowIndex);
    }
  }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("A Game of Thrones", "G.R.R Martin", 694, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 448, false);

displayBooks();

const newBookButton = document.querySelector("#new-book-button");

newBookButton.addEventListener("click", (e) => {
  document.querySelector(".form-popup").style.display = "block";
});

const addBookButton = document.querySelector("#add-book-button");

addBookButton.addEventListener("click", (e) => {
  const bookTitle = document.querySelector("#book-title");
  const bookAuthor = document.querySelector("#book-author");
  const bookPages = document.querySelector("#book-pages");
  const bookReadYes = document.querySelector("#read-yes");
  const bookReadNo = document.querySelector("#read-no");
  let bookRead;
  if (bookReadYes.checked) {
    bookRead = true;
  } else if (bookReadNo.checked) {
    bookRead = false;
  } else {
    alert("Have you read this book?!");
    e.preventDefault();
    return;
  }
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead
  );
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookReadYes.checked = false;
  bookReadNo.checked = false;
  e.preventDefault();
});

const cancelAddBook = document.querySelector("#cancel-add-book");

cancelAddBook.addEventListener("click", (e) => {
  document.querySelector(".form-popup").style.display = "none";
  e.preventDefault();
});

const deleteButtons = document.querySelectorAll(".delete-book");

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (e) => {
    console.log(deleteButton);
    deleteBook(deleteButton.dataset.id);
  });
});

document.body.addEventListener;
