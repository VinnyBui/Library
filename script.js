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
  const isReadValue = isRead.value.trim();

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
const bookGrid = document.getElementById("bookGrid")

function updateBook(){
  resetGrid()
  for(let book of myLibrary){
    displayBook(book)
  }
  closeModal(modal)
}

function resetGrid(){
  bookGrid.innerHTML = '';
}

function displayBook(book){
  localSave()
  const bookContainer = document.createElement('div')
  const removeBtn = document.createElement('img');
  removeBtn.src="/imgs/x.png";
  const title = document.createElement('h1');
  const author = document.createElement('h2');
  const pages = document.createElement('h3');
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = "checkbox";
  const span = document.createElement('span');

  bookContainer.classList.add('book')
  label.classList.add('switch')
  span.classList.add('slider')
  removeBtn.classList.add('remove')
  title.textContent = `${book.title}`
  author.textContent = `${book.author}`
  pages.textContent = `${book.pages}`



  bookContainer.append(removeBtn)
  bookContainer.append(title)
  bookContainer.append(author)
  bookContainer.append(pages)
  bookContainer.append(label)
  label.append(input)
  label.append(span)
  bookGrid.append(bookContainer)
}


//Remove book



//Listeners//
//if the user clicks outside of the modal, it will automatically close the modal
document.addEventListener('click', function(event){
  if(!event.target.closest(".modal") && !event.target.closest(".addbook")){
    closeModal(modal)
  }
})

document.getElementById('btn').addEventListener('click',(e) =>{
  e.preventDefault();
  formValidation();
});


updateBook();