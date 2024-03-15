document.addEventListener('DOMContentLoaded', function() {

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const addBooksRow = document.getElementById('addBooksRow');
    const cards = document.getElementById('cards');
    const showAddBookForm = document.getElementById('showAddBookForm');

    const myLibrary = [
        {
            title: 'Cosmos',
            author: 'Carl Sagan',
            pages: '384',
            readOrNot: 'Read',
        },
        {
            title: "The Devil's Candy",
            author: 'Julie Salamon',
            pages: '448',
            readOrNot: 'Read',
        },
    ];

    function book(title, author, pages, readOrNot) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readOrNot = readOrNot;
    }

    function addNewBookToLibrary() {
        let bookTitle = titleInput.value;
        let bookAuthor = authorInput.value;
        let bookPages = pagesInput.value;
        // Get the value of the checked radio button
        let bookReadOrNot = document.querySelector('input[name="readOrNot"]:checked').value;

        const newBook = new book(bookTitle, bookAuthor, bookPages, bookReadOrNot);

        myLibrary.push(newBook);
        updateBooksIndex();

        createNewCard(newBook.title, newBook.author, newBook.pages, newBook.readOrNot, newBook.index);
    }

    // Update the index property for the all books in array
    function updateBooksIndex() {
        myLibrary.forEach((book, idx) => {
            book.index = idx;
        });
    }

    // Delete all cards
    function deleteAllCards() {
        const bookCards = document.querySelectorAll('.bookCard');
        bookCards.forEach(card => card.remove());
    }

    // Delete book from card and array
    function removeBook(dataIndex) {
        deleteAllCards();

        myLibrary.splice(dataIndex, 1);
        upDateCardsFromArray();
    }

    // Flip current readOrNotRead status
    function changeReadStatus(dataIndex) {
        let currentReadStatus = myLibrary[dataIndex].readOrNot;

         if (currentReadStatus == 'Read') {
            myLibrary[dataIndex].readOrNot = 'Unread';
         }
         else {
            myLibrary[dataIndex].readOrNot = 'Read';
         }
         deleteAllCards();
         upDateCardsFromArray();
    }

    // Add an event listener to each removeBtn as it is created
    function addEventListenerBtn(removeBtn) {
        removeBtn.addEventListener('click', () => {
            const clickedRemoveBtn = event.target;
            const bookCardDivToRemove = clickedRemoveBtn.closest('.bookCard');
            const dataIndex = bookCardDivToRemove.getAttribute('data-index');

            removeBook(dataIndex);
        });
    }

    // Add an event listener to each changeReadBtn as it is created
    function addEventListenerReadBtn(changeReadBtn) {
        changeReadBtn.addEventListener('click', () => {
            const clickedChangeReadBtn = event.target;
            const bookCardDivToChange = clickedChangeReadBtn.closest('.bookCard');
            const dataIndex = bookCardDivToChange.getAttribute('data-index');

            changeReadStatus(dataIndex);
        });
    }

    // Add all books in array to their own card
    function upDateCardsFromArray() {
        myLibrary.forEach(obj => {
        
            updateBooksIndex();
    
            let bookTitle = obj.title;
            let bookAuthor = obj.author;
            let bookPages = obj.pages;
            let readOrNot = obj.readOrNot;
            let index = obj.index;
    
            createNewCard(bookTitle, bookAuthor, bookPages, readOrNot, index);
        });
    }

    // Create and add the new card to the html
    function createNewCard(title, author, pages, readOrNot, index) {
        const bookCardDiv = document.createElement("div");
        bookCardDiv.classList.add("bookCard");
        bookCardDiv.setAttribute("data-index", index);

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        bookCardDiv.appendChild(titleDiv);

        const titleH2 = document.createElement("h2");
        titleH2.textContent = title;
        titleDiv.appendChild(titleH2);

        const authorDiv = document.createElement("div");
        authorDiv.classList.add("author");
        bookCardDiv.appendChild(authorDiv);

        const authorP = document.createElement("p");
        authorP.textContent = "By";
        authorDiv.appendChild(authorP);

        const authorH3 = document.createElement("h3");
        authorH3.textContent = author;
        authorDiv.appendChild(authorH3);

        const pagesDiv = document.createElement("div");
        pagesDiv.classList.add("pages");
        bookCardDiv.appendChild(pagesDiv);

        const pagesP1 = document.createElement("p");
        pagesP1.textContent = "Length: " + pages + ", " + (readOrNot == "Read" ? "Read" : "Unread");
        pagesDiv.appendChild(pagesP1);
    
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("removeBtn");
        bookCardDiv.appendChild(removeBtn);
        addEventListenerBtn(removeBtn);
        

        const changeReadBtn = document.createElement("button");
        changeReadBtn.textContent = "Read";
        changeReadBtn.classList.add("changeReadBtn");
        bookCardDiv.appendChild(changeReadBtn);
        addEventListenerReadBtn(changeReadBtn);
        

        cards.insertBefore(bookCardDiv, cards.lastChild);
    }


    upDateCardsFromArray();

    // Show or hide addBooksForm when btn clicked
    showAddBookForm.addEventListener('click', () => {
        //Testing
        console.log(myLibrary);
        if (addBooksRow.style.display === "none") {
            addBooksRow.style.display = "flex";
          } else {
            addBooksRow.style.display = "none";
          }
    });

    // When form submitted
    document.getElementById("addBooksRow").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
          
        addNewBookToLibrary();
    });

});