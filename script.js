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

function createBook(){
  //check if user read the book
  //Creating an object from the 'BOOK' class and pushing to our Library array
  const book = new Book(title.value, author.value, pages.value, isRead.value);
  myLibrary.push(book);
}

function removeBookFromLibrary(event){
    const index = event.target.parentElement.getAttribute('data-index');

    if(auth.currentUser){
      removeBookDB(index);
      updateBook();
    }else{
      myLibrary.splice(index, 1);
      updateBook();
      localSave();
    }
}

//Local storage//
function restoreLocal(){
  const oldBooks = JSON.parse(localStorage.getItem('books'));
  if(localStorage.getItem('books') == null){
    myLibrary = [];
  }else{
    myLibrary = oldBooks;
  }
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
    if(auth.currentUser){
      createBookDB();
    }else{
      createBook();
      updateBook();
      localSave();
    }
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
  displayBook()
  closeModal(modal)
}

function resetGrid(){
  bookGrid.innerHTML = '';
}

function displayBook(){
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

    if(input.checked){
      myLibrary[i].readStatus == true;
    }else{
      myLibrary[i].readStatus == false;
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


//Firebase auth

const auth = firebase.auth()
const logInBtn = document.getElementById('logInBtn')
const logInUI = document.querySelector('.logIn')
const logOutUI = document.querySelector('.logOut')
const logOutBtn = document.getElementById('logOutBtn')


//user login/logout
function signIn(){
  let provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider).then((rel)=>{
    console.log(rel)
  }).catch((err => {
    console.log(err)
  }))
}

function signOut(){
  auth.signOut()
}

function navBar(user){
  if(user){
    logInUI.classList.remove('active')
    logOutUI.classList.add('active')
  }else{
    logInUI.classList.add('active')
    logOutUI.classList.remove('active')
  }
}

auth.onAuthStateChanged(function(user){
  if(user){
    console.log("user is in")
    setupRealTimeListener()
  }else{
    console.log('user is out')
    restoreLocal()
    updateBook()
  }
  navBar(user)
});


//Firestore//

const db = firebase.firestore()

function getFormInput(){
  const book = new Book(title.value, author.value, pages.value, isRead.value);
  return book;
}

function addBookDB(book){
  db.collection('books').add(bookToDoc(book))
}

function createBookDB(){
  const newBook = getFormInput()
  addBookDB(newBook)
}

//converting all our info into doc fields
function bookToDoc(book){
  return {
    ownerId: auth.currentUser.uid,
    title: book.title,
    author: book.author,
    pages: book.pages,
    isRead: book.readStatus,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
}

let unsubscribe

//calling for a list of books that has the same ownerId and setting it to myLibrary
function setupRealTimeListener(){
  unsubscribe = db
    .collection('books')
    .where('ownerId', '==', auth.currentUser.uid)
    .orderBy('createdAt')
    .onSnapshot((snapshot) => {
      myLibrary = docsToBooks(snapshot.docs)
      updateBook()
    })
}

//getting values from document
function docsToBooks(docs){
  return docs.map((doc) => {
    return new Book(
      doc.data().title,
      doc.data().author,
      doc.data().pages,
      doc.data().isRead
    )
  })
}

//delete
const getBookByIndex = async (index) =>{
  //Grabbing the document of the current user and organizing it ascending order from least to most recent timestamp
  const snapshot = await db
  .collection('books')
  .where('ownerId','==', auth.currentUser.uid)
  .orderBy("createdAt", "asc")
  .get()
  
  //Getting all the document ID of the snapshot
  const bookID = snapshot.docs.map(doc => doc.id)
  //Sending out the Document ID of the book user wants to remove
  return bookID[index]
}

const removeBookDB = async (index) =>{
  //Calling for the document with bookID we want to remove and delete it from DB
  db.collection('books')
  .doc(await getBookByIndex(index))
  .delete()
}

logInBtn.onclick = () => signIn()
logOutBtn.onclick = () => signOut()


