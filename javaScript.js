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

    function book() {
    // the constructor...
        
    }

    function addBookToLibrary() {
        myLibrary.forEach(obj => {
            let bookTitle = obj.title;
            let bookAuthor = obj.author;
            let bookPages = obj.pages;
            createNewCard(bookTitle, bookAuthor, bookPages);
        });
    }

    // Create and add new card to html
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
        pagesP1.textContent = "Lenghth: ";
        pagesDiv.appendChild(pagesP1);
    
        const pagesP2 = document.createElement("p");
        pagesP2.textContent = pages;
        pagesDiv.appendChild(pagesP2);

        const cardBtn1 = document.createElement("button");
        cardBtn1.textContent = "Click";
        bookCardDiv.appendChild(cardBtn1);

        const cardBtn2 = document.createElement("button");
        cardBtn2.textContent = "Click";
        bookCardDiv.appendChild(cardBtn2);
        

        cards.insertBefore(bookCardDiv, cards.lastChild);
    }


    const addBook = document.getElementById('addBook');
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const cards = document.getElementById('cards');


    // Temp test
    addBookToLibrary();

    // When form submitted
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get the value of the checked radio button
        let selectedReadOrNot = document.querySelector('input[name="readOrNot"]:checked');
      
        if(selectedReadOrNot) {
          alert("Read Status: " + selectedReadOrNot.value);
        } else {
          alert("Please select if read or unread.");
        }
      });

});