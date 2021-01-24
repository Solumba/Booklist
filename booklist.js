//Book class: to create a book object when you add a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// create a UI class to handle UI tasks
class UI {
    static displayBooks(){
        //creating a hardcoded array of books to act like local storage which would be changed later to local storage 

        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe', 
                isbn: '3433434'
            },
            {
                title: 'Book Two',
                author: 'Jenny Doe', 
                isbn: '343224'
            }
        ];
        const books = StoredBooks;
        //creating a function  that would loop through all add all book objects in the list of stored and add the books to the table as tr elements 
        books.forEach((book)=> UI.addBookToList(book));
    }
    // the book param is already passed in the function above, that's how we are able to access its properties and rep the in td elems
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
                <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>   
            `
        );
        list.appendChild(row);
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
    let newBook = new Book(title, author, isbn);

    //add newBook  to list by calling the static method on the UI class which adds all properties of new book as table data in the previosly created tr node which was appended to the table body
    UI.addBookToList(newBook);
})