document.addEventListener('DOMContentLoaded', function() {

    class Book {
        constructor(title, author, pages, readOrNot) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.readOrNot = readOrNot;
        }
        
        set setReadOrNot(readStatus) {
            this.readOrNot = readStatus;
        }

    }

    class Library {
        static books = [];

        // Add pre-defined books
        static initializeLibrary() {
            const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, "Read");
            const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, "Unread");
            const book3 = new Book("1984", "George Orwell", 328, "Read");

            this.books.push(book1, book2, book3);
        }

        static addBook(book) {
            this.books.push(book);
        }

        static getLibrary() {
            return this.books;
        }

        static reverseReadStatus(book) {
            let currentReadStatus = book.readOrNot;
            if (currentReadStatus == 'Read') {
                book.setReadOrNot = 'Unread';
            }
            else {
                book.setReadOrNot = 'Read';
            }
            BookDOMRenderer.reRenderBooks();
        }
        
        static deleteAllCards() {
            const bookCards = document.querySelectorAll('.bookCard');
            bookCards.forEach(card => card.remove());
        }

        static updateBooksIndex() {
            Library.books.forEach((book, idx) => {
                book.index = idx;
            });
        }

        static removeBook(dataIndex) {
            Library.deleteAllCards();
    
            Library.books.splice(dataIndex, 1);
            BookDOMRenderer.upDateCardsFromArray();
        }

    }

    class BookDOMRenderer {
        static addEventListenerReadBtn(changeReadBtn) {
            changeReadBtn.addEventListener('click', (event) => {
                const clickedChangeReadBtn = event.target;
                BookDOMRenderer.handleChangeReadBtnClick(clickedChangeReadBtn);
            });
        }

        static handleChangeReadBtnClick(clickedChangeReadBtn) {
            const bookCardDivToChange = clickedChangeReadBtn.closest('.bookCard');
            const dataIndex = bookCardDivToChange.getAttribute('data-index');

            Library.reverseReadStatus(Library.getLibrary()[dataIndex]);
            console.log(Library.getLibrary());
        }

        static addEventListenerRmvBtn(removeBtn) {
            removeBtn.addEventListener('click', (event) => {
                BookDOMRenderer.handleRmvBtnClick(event);
            });
        }

        static handleRmvBtnClick(event) {
            const clickedRemoveBtn = event.target;
            const bookCardDivToRemove = clickedRemoveBtn.closest('.bookCard');
            const dataIndex = bookCardDivToRemove.getAttribute('data-index');

            Library.removeBook(dataIndex);
        }

        static reRenderBooks() {
            Library.deleteAllCards();
            BookDOMRenderer.upDateCardsFromArray();
        }

        static upDateCardsFromArray() {
            Library.updateBooksIndex();
            Library.getLibrary().forEach(obj => {
                BookDOMRenderer.createNewCard(obj);
            });
        }
        

        static createNewCard(newBook) {
            const bookCardDiv = document.createElement("div");
            bookCardDiv.classList.add("bookCard");
            bookCardDiv.setAttribute("data-index", newBook.index);

            const titleDiv = document.createElement("div");
            titleDiv.classList.add("title");
            bookCardDiv.appendChild(titleDiv);

            const titleH2 = document.createElement("h2");
            titleH2.textContent = newBook.title;
            titleDiv.appendChild(titleH2);

            const authorDiv = document.createElement("div");
            authorDiv.classList.add("author");
            bookCardDiv.appendChild(authorDiv);

            const authorP = document.createElement("p");
            authorP.textContent = "By";
            authorDiv.appendChild(authorP);

            const authorH3 = document.createElement("h3");
            authorH3.textContent = newBook.author;
            authorDiv.appendChild(authorH3);

            const pagesDiv = document.createElement("div");
            pagesDiv.classList.add("pages");
            bookCardDiv.appendChild(pagesDiv);

            const pagesP1 = document.createElement("p");
            pagesP1.textContent = "Length: " + newBook.pages + ", " + newBook.readOrNot;
            pagesDiv.appendChild(pagesP1);
        
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("removeBtn");
            bookCardDiv.appendChild(removeBtn);
            BookDOMRenderer.addEventListenerRmvBtn(removeBtn);

            const changeReadBtn = document.createElement("button");
            changeReadBtn.textContent = "Read";
            changeReadBtn.classList.add("changeReadBtn");
            bookCardDiv.appendChild(changeReadBtn);
            BookDOMRenderer.addEventListenerReadBtn(changeReadBtn);

            cards.insertBefore(bookCardDiv, cards.lastChild);
        }
    }

    class BookInput {
        static showAddBookFormBtn = document.getElementById('showAddBookForm');
        static addBooksRow = document.getElementById("addBooksRow");
        static titleInput = document.getElementById('title');
        static authorInput = document.getElementById('author');
        static pagesInput = document.getElementById('pages');
    
        static addEventListenerShowAddBookForm() {
            BookInput.showAddBookFormBtn.addEventListener('click', () => {
                BookInput.handleShowAddBookFormClick();
            });
        }
    
        static handleShowAddBookFormClick() {
            if (BookInput.addBooksRow.style.display === "none" || BookInput.addBooksRow.style.display === "") {
                BookInput.addBooksRow.style.display = "flex";
            } else {
                BookInput.addBooksRow.style.display = "none";
            }
            // Testing
            console.log(Library.getLibrary());
        }
    
        static addEventListenerAddBooksRow() {
            BookInput.addBooksRow.addEventListener('submit', (event) => {
                BookInput.handleAddBooksRowClick(event);
            });
        }
    
        static handleAddBooksRowClick(event) {
            event.preventDefault(); // Prevent the default form submission
            BookInput.addNewBookObj();
        }
    
        static addNewBookObj() {
            const readOrNot = document.getElementById('read').checked ? document.getElementById('read').value : document.getElementById('unread').value;

            if (BookInput.titleInput.value && BookInput.authorInput.value && BookInput.pagesInput.value && readOrNot) {
                const newBook = new Book(BookInput.titleInput.value, BookInput.authorInput.value, BookInput.pagesInput.value, readOrNot);
                Library.addBook(newBook);
                Library.updateBooksIndex();
                BookDOMRenderer.createNewCard(newBook);
            } else {
                alert("Please fill in all fields and select read status.");
            }
        }
    }

    // Add event listeners within each class
    BookInput.addEventListenerShowAddBookForm();
    BookInput.addEventListenerAddBooksRow();

    Library.initializeLibrary()
    BookDOMRenderer.reRenderBooks();

});    