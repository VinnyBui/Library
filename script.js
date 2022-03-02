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


//Local storage//
function addBookToLibrary(){
  //check if user read the book
  checkTF();
  //Creating an object from the 'BOOK' class and pushing to our Library array
  const book = new Book(title.value, author.value, pages.value, isRead.value)
  myLibrary.push(book);
  //set 'books' as key, and put myLibrary as value
  localSave()
}

function localSave(){
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

if(localStorage.getItem('books') == null){
  myLibrary = [];
}else{
  const oldBooks = JSON.parse(localStorage.getItem('books'));
  myLibrary = oldBooks;
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
  document.getElementById('btn').addEventListener('click',updateBook);
});


//Display book
const bookGrid = document.getElementById("bookGrid")

function updateBook(){
  addBookToLibrary()
  resetGrid()
  for(let book of myLibrary){
    displayBook(book)
  }
}

function resetGrid(){
  bookGrid.innerHTML = ''
}

function displayBook(book){
  const bookContainer = document.createElement('div')
  const title = document.createElement('h1');
  const author = document.createElement('h2');
  const pages = document.createElement('h3');
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = "checkbox";
  const span = document.createElement('span')

  bookContainer.classList.add('book')
  label.classList.add('switch')
  span.classList.add('slider')

  title.textContent = `"${book.title}"`
  author.textContent = `"${book.author}"`
  author.textContent = `"${book.pages}"`

  bookContainer.append(title)
  bookContainer.append(author)
  bookContainer.append(pages)
  bookContainer.append(label)
  label.append(input)
  label.append(span)
  bookGrid.append(bookContainer)
}
