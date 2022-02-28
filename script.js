//Data Structures//

let myLibrary = [];
/*
function Book(title, author, pages, read){
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}*/

class Book{
  constructor(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = isRead;
  }
}

function addBookToLibrary(){
  //check if user read the book
  checkTF();
  //Creating an object from the 'BOOK' class and pushing to our Library array
  const book = new Book(title.value, author.value, pages.value, isRead.value)
  myLibrary.push(book);
  //set 'books' as key, and put myLibrary as value
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

//if 'books' data is empty, then myLibrary is empty else when local storage calls for 'books', all of the old book will be store in 'oldBooks' variable and that will become the library
if(localStorage.getItem('books') == null){
  myLibrary = [];
}else{
  //get the value stored in 'books' and make myLibrary equal to it
  const oldBooks = JSON.parse(localStorage.getItem('books'));
  myLibrary = oldBooks;
}

function showMyLibrary(){
  
}

//UI

//Modal//
const addBook_btn = document.getElementById('addBookBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

addBook_btn.addEventListener('click', () => {
  openModal(modal)
})

//if the user clicks outside of the modal, it will automatically close the modal
document.addEventListener('click', function(event){
  if(!event.target.closest(".modal") && !event.target.closest(".addbook")){
    closeModal(modal)
  }
})

function openModal(modal){
  if(modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal){
  modal.classList.remove('active')
  overlay.classList.remove('active')
}


//Form input//
const form = document.getElementById('addBookForm');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const isRead = document.getElementById('isRead');

//make true & false to see if the reader have read the book
function checkTF(){
  if(isRead.checked == true){
    isRead.value = true;
  }else{
    isRead.value = false;
  }
}

//only call when 'SUBMIT' btn is pressed
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('btn').addEventListener('click', addBookToLibrary);
});

