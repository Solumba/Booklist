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

    //Method to create a div for alert and display it within the container , also have it delete after 3secs
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
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('please add valid data', 'danger')
    }
    else {
        let newBook = new Book(title, author, isbn);
        UI.showAlert('Book Added Successfully!', 'success')
        /*add newBook  to list by calling the static method on the UI class which adds all properties of 
        new book as table data in the previosly created tr node which was appended to the table body*/
        UI.addBookToList(newBook);
        UI.clearFields();
    }
})

// Event: deleting a book
//using event propagation  to select an item being clicked within the book-list element 
document.getElementById('book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);
    UI.showAlert("Book Deleted", "danger");
});
