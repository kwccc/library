const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };

  this.toggleRead = function () {
    this.read = !this.read;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBook(book);
}

function displayBook(book) {
  const tableBody = document.querySelector(".table-body");
  const tableRow = document.createElement("tr");
  const tableTitle = document.createElement("td");
  const tableAuthor = document.createElement("td");
  const tablePages = document.createElement("td");
  const tableRead = document.createElement("td");
  const deleteButtonCol = document.createElement("td");
  const toggleReadButtonCol = document.createElement("td");

  const deleteButton = document.createElement("button");
  const toggleReadButton = document.createElement("button");
  deleteButtonCol.appendChild(deleteButton);
  toggleReadButtonCol.appendChild(toggleReadButton);

  tableTitle.textContent = book.title;
  tableAuthor.textContent = book.author;
  tablePages.textContent = book.pages;

  if (book.read) {
    tableRead.textContent = "read";
  } else {
    tableRead.textContent = "not read yet";
  }

  deleteButton.textContent = "Delete";
  deleteButton.dataset.id = book.id;
  deleteButton.addEventListener("click", (e) => {
    deleteBook(deleteButton.dataset.id);
  });

  toggleReadButton.textContent = "Toggle";
  toggleReadButton.addEventListener("click", (e) => {
    book.toggleRead();
    if (book.read) {
      tableRead.textContent = "read";
    } else {
      tableRead.textContent = "not read yet";
    }
  });

  tableRow.appendChild(tableTitle);
  tableRow.appendChild(tableAuthor);
  tableRow.appendChild(tablePages);
  tableRow.appendChild(tableRead);
  tableRow.appendChild(deleteButtonCol);
  tableRow.appendChild(toggleReadButtonCol);
  tableBody.appendChild(tableRow);
}

function deleteBook(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary.splice(i, 1);
      const bookRow = document.querySelector(`[data-id="${id}"]`);
      document
        .querySelector("table")
        .deleteRow(bookRow.parentNode.parentNode.rowIndex);
    }
  }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("A Game of Thrones", "G.R.R Martin", 694, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 448, false);

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
