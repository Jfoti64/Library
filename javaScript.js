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

    function Book() {
    // the constructor...
    }

    function addBookToLibrary() {
    // do stuff here
    }


    const addBook = document.getElementById('addBook');
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');


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