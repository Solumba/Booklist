/* A book registry app you can add books too and delete from
it uses local storage to ensure whatever books you add remains it
it was always also built harnessing the perks of oop */

//Book class: to create a book object when you add a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

/* here we create a book array and pass it to the
local storage after searching to see if it contains any books in it
the else statement uses the parse method when getting the books(if there are any)
because json would return only strings so parse makes it an object or its original state
*/ 
class DB {

    //method to create local storage
    static getBooks(){
        let books;
        //checking if books are already in LS
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books
    }

    //method to add books to local storage
    static addBooks(book){
        //getting the existing books which is an empty book array
        const books = DB.getBooks();

        //push a new book to this arr of books
        books.push(book);
        
        /*setting the array of books to the books key
        we use json.stringify because LS doesnt accept objects*/
        localStorage.setItem('books', JSON.stringify(books));
    }

    //method to remove books from local storage
    static removeBooks(isbn){
        const books = DB.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        //we stringify our books array because ls doesn't take in anything that's not a string 
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// create a UI class to handle UI tasks
class UI {
    //method to display our books from local storage
    static displayBooks(){
        //getting our array of books from local storage
        const books = DB.getBooks();

        /*creating a function  that would loop through all add all book objects 
        in the list of stored and add the books to the table as tr elements */
        books.forEach((book)=> UI.addBookToList(book));
    }

    // the book param is already passed in the function above, that's how we are able to access its properties and rep the in td elems
    //method to add our book props to the ui as td in tr of our table
    static addBookToList(book){
        const list = document.getElementById('book-list');

        // create a row where you would add the book list to the table
        const row = document.createElement('tr');

        //adding the book objects as table date to the row created 
        row.innerHTML = (
            `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="btn btn-danger btn-sm delete delete">X</a></td>   
            `
        );
        list.appendChild(row);
    }

    //method to delete book item by targeting an element with the delete class and removing its parent
    static deleteBook(elem){
        if(elem.classList.contains('delete')){
            elem.parentElement.parentElement.remove();
        }
    }

    //method to clear input fields after adding a book
    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    /*Method to create a div for alert and display it within the container , also have it delete after 3secs
    the error message is passed in dynamically so whenever the method is called, you can pass in a 
    custom message and a custom class for your bootstrap design */
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        const alertMessage = document.createTextNode(message);
        div.appendChild(alertMessage);
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form)

        //make alert vanish after 3secs
        setTimeout(()=> document.querySelector('.alert').remove(), 5000);
    }
}


//Event: event to display the books 
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Event: adding books

//getting the form and adding an event and a function  for when you click of add book

document.getElementById("book-form"). addEventListener('submit', (e)=>{
    e.preventDefault()
    //getting form values using their ids
    var title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    //instantiate a book(which isnt static) and pass in the data gotten from the input fields 
    //validation to ensure user doesnt pass in empty fields
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('please add valid data', 'danger')
    }

    //validation to ensure the isbn is always a number 
    else if (isNaN(isbn)) {
        UI.showAlert("please add a valid isbn number", 'danger');
    }
    else {
        let newBook = new Book(title, author, isbn);
        UI.showAlert('Book Added Successfully!', 'success')
        /*add newBook  to list by calling the static method on the UI class which adds all properties of 
        new book as table data in the previosly created tr node which was appended to the table body*/
        UI.addBookToList(newBook);
        // add book to DB
        DB.addBooks(newBook);
        UI.clearFields();
    }
})

// Event: deleting a book
//using event propagation  to select an item being clicked within the book-list element 
document.getElementById('book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);
    
    //textContent gets the isbn value of the element being targeted
    DB.removeBooks(e.target.parentElement.previousElementSibling.textContent); 
    UI.showAlert("Book Deleted", "danger");
});

//Project completed