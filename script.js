const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return(this.title, this,author, this.pages, this.status);
    };
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').value;

    const newBook = new Book(title, author, pages, status);

    myLibrary.push(newBook);

    

    console.log(newBook);
}

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        addBookToLibrary();
        cleanInput();
        displayBooks();
    });
});

// displayBooks()
function displayBooks() {
    const table = document.querySelector('table');
    const tableBody = document.querySelector('tbody');

    tableBody.textContent = '';

    myLibrary.forEach((book, index) =>{
        // Create a new row
        const row = document.createElement('tr');

        // Create table cells for each book property
        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        row.appendChild(titleCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;
        row.appendChild(pagesCell);

        const statusCell = document.createElement('td');
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');
        toggleButton.textContent = book.status;
        toggleButton.addEventListener('click', () => {
        toggleStatus(toggleButton);
        });
        statusCell.appendChild(toggleButton);
        row.appendChild(statusCell);

        // Create delete button
        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');

        deleteButton.textContent = 'DELETE';
        deleteButton.classList.add('deleteButton');
        deleteButton.dataset.index = index; // Store the index of the book as a data attribute
        deleteButton.addEventListener('click', deleteBook);
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
        row.classList.add('new-row');

        // Add the row to the table body
        tableBody.appendChild(row);
    });
}

function deleteBook(e) {
    const index = parseInt(e.target.dataset.index);
    myLibrary.splice(index, 1);

    // Update the table display to reflect the changes
    displayBooks();
}

function cleanInput() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
}

function toggleStatus(statusCell) {
    const statuses = ['Read    ', 'Reading ', 'Not read'];
    const currentStatus = statusCell.textContent;
    const currentIndex = statuses.indexOf(currentStatus);
    const newIndex = (currentIndex + 1) % statuses.length;
    statusCell.textContent = statuses[newIndex];
}
