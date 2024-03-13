document.addEventListener('DOMContentLoaded', function() {

    


    const myLibrary = [
        {
            title: 'Cosmos',
            author: 'Carl Sagan',
            pages: '384',
        },
        {
            title: "The Devil's Candy",
            author: 'Julie Salamon',
            pages: '448',
        },
    ];

    function book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    function addBookToLibrary() {
        let bookTitle = titleInput.value;
        let bookAuthor = authorInput.value;
        let bookPages = pagesInput.value;

        const newBook = new book(bookTitle, bookAuthor, bookPages);

        myLibrary.push(newBook);
        createNewCard(newBook.title, newBook.author, newBook.pages);
    }

    // Create and add the new card to the html
    function createNewCard(title, author, pages) {
        const bookCardDiv = document.createElement("div");
        bookCardDiv.classList.add("bookCard");

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
        pagesP1.textContent = "Length: " + pages + ", read or unread";
        pagesDiv.appendChild(pagesP1);
    
        //const pagesP2 = document.createElement("p");
        //pagesP2.textContent = pages;
        //pagesDiv.appendChild(pagesP2);

        const cardBtn1 = document.createElement("button");
        cardBtn1.textContent = "Remove";
        bookCardDiv.appendChild(cardBtn1);

        const cardBtn2 = document.createElement("button");
        cardBtn2.textContent = "Read";
        bookCardDiv.appendChild(cardBtn2);
        

        cards.insertBefore(bookCardDiv, cards.lastChild);
    }


    const addBookBtn = document.getElementById('addBook');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const cards = document.getElementById('cards');


    // Add all books already in array to a card
    myLibrary.forEach(obj => {
        let bookTitle = obj.title;
        let bookAuthor = obj.author;
        let bookPages = obj.pages;
        createNewCard(bookTitle, bookAuthor, bookPages);
    });


    // When form submitted
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get the value of the checked radio button
        let selectedReadOrNot = document.querySelector('input[name="readOrNot"]:checked');


        
      
        if(selectedReadOrNot) {
            alert("Read Status: " + selectedReadOrNot.value);
            
            addBookToLibrary();

            //Testing
            console.log(myLibrary);
        } else {
            alert("Please select if read or unread.");
        }
      });

});