//Data Structures//

let myLibrary = [];

class Book{
  constructor(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = isRead;
  }
}

function addBookToLibrary(){
  //check if user read the book
  //Creating an object from the 'BOOK' class and pushing to our Library array
  const book = new Book(title.value, author.value, pages.value, isRead.value);
  myLibrary.push(book);
}

function removeBookFromLibrary(event){
    const index = event.target.parentElement.getAttribute('data-index');
    myLibrary.splice(index, 1);
    updateBook();
}

//Local storage//
if(localStorage.getItem('books') == null){
  myLibrary = [];
}else{
  const oldBooks = JSON.parse(localStorage.getItem('books'));
  myLibrary = oldBooks;
}

function localSave(){
  localStorage.setItem('books', JSON.stringify(myLibrary));
}


//Modal//
const addBook_btn = document.getElementById('addBookBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

addBook_btn.addEventListener('click', () => {
  openModal(modal)
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

//Form Validation//
function formValidation(){
  //trim() removes whitespace
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const pagesValue = pages.value.trim();

  if(titleValue === ''){
    setErrorfor(title, "Title cannot be blank");
  }else{
    setSuccessFor(title);
  }

  if(authorValue === ''){
    setErrorfor(author, "Author cannot be blank");
  }else{
    setSuccessFor(author);
  }

  if(pagesValue === ''){
    setErrorfor(pages, "Pages cannot be blank");
  }else{
    setSuccessFor(pages);
  }

  //if everything is filled out, then add 
  if(titleValue !== '' && authorValue !==' ' && pagesValue !== ''){
    checkTF();
    addBookToLibrary();
    updateBook();
  }
}

function setErrorfor(input, message){
  const formControl = input.parentElement; //.form control
  const small = formControl.querySelector('small');

  small.innerText = message;
  formControl.className = 'form-control error';
}

function setSuccessFor(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success'
}


//Display book//
const bookGrid = document.getElementById("bookGrid");

function updateBook(){
  resetGrid()
  displayBook();
  closeModal(modal)
}

function resetGrid(){
  bookGrid.innerHTML = '';
}

function displayBook(){
  localSave()
  for (let i = 0; i < myLibrary.length; i += 1){
    const bookContainer = document.createElement('div')
    const removeBtn = document.createElement('h3')
    removeBtn.textContent = 'X'
    const title = document.createElement('h1');
    const author = document.createElement('h2');
    const pages = document.createElement('h3');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = "checkbox";
    const span = document.createElement('span');
  
    bookContainer.classList.add('book')
    bookContainer.setAttribute('data-index', i);
    input.classList.add('input-slider')
    label.classList.add('switch')
    span.classList.add('slider')
    removeBtn.classList.add('remove')
    title.textContent = `${myLibrary[i].title}`
    author.textContent = `${myLibrary[i].author}`
    pages.textContent = `${myLibrary[i].pages}`
    
    if(myLibrary[i].readStatus == 'true'){
      input.checked = true;
    }
    
    bookContainer.append(removeBtn)
    bookContainer.append(title)
    bookContainer.append(author)
    bookContainer.append(pages)
    bookContainer.append(label)
    label.append(input)
    label.append(span)
    bookGrid.append(bookContainer)
  }
}

//Listeners//
//if the user clicks outside of the modal, it will automatically close the modal
document.addEventListener('click', function(event){
  if(!event.target.closest(".modal") && !event.target.closest(".addbook")){
    closeModal(modal)
  }
  if(event.target.className == 'remove'){
    removeBookFromLibrary(event);
  }
})

document.getElementById('btn').addEventListener('click',(e) =>{
  e.preventDefault();
  formValidation();
});


updateBook();


//Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyDfs9Fea4SXloKX1nP1LtWfPDcjr77Zeeo",
  authDomain: "digital-library-497be.firebaseapp.com",
  projectId: "digital-library-497be",
  storageBucket: "digital-library-497be.appspot.com",
  messagingSenderId: "586824525857",
  appId: "1:586824525857:web:83345e6157311acacb9b60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const logInBtn = document.getElementById('logInBtn');


onAuthStateChanged(auth, user => {
  if(user != null){
    console.log('Logged in');
  }else{
    console.log('no user');
  }
});

function signIn(){
  var google_provider = new GoogleAuthProvider();
  auth.signInWithPopup(google_provider);
};


logInBtn.onclick = () => signIn();