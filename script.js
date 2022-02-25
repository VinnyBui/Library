let myLibrary = [];
function Book(title, author, pages, read){
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(){

}

function showMyLibrary(){
  //Loops through the array and displays each book on the page
}

const addBook_btn = document.getElementById("addBookBtn");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

addBook_btn.addEventListener('click', () => {
  openModal(modal)
})

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
