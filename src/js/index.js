const app = {
 navButton: document.querySelector('.nav__btn'),
 aboutCloseButton: document.querySelector('.about__close'),
 noteCreatorForm: document.querySelector('.form'),
 notes: document.querySelector('.notes'),
 data: [],
 showAbout: function() {
  this.aboutCloseButton.parentNode.classList.add('about__active'); // show about section popup
 },
 closeAbout: function() {
  this.aboutCloseButton.parentNode.classList.remove('about__active'); // close about section popup
 },
 bindEvents: function() {
  // bind events
  this.navButton.addEventListener('click', this.showAbout.bind(this));
  this.aboutCloseButton.addEventListener('click', this.closeAbout.bind(this));
  this.noteCreatorForm.addEventListener('submit', this.createNote.bind(this));
  console.log('binded events');
 },
 createNodes: function(title, description) {
  // create dom structure for note and append to notes container
  const fragment = document.createDocumentFragment();
  const note = document.createElement('li');
  note.classList.add('note');

  const noteContainer = document.createElement('div');
  noteContainer.classList.add('note__container');

  const noteDeleteBtn = document.createElement('span');
  noteDeleteBtn.classList.add('note__deleteBtn');
  noteDeleteBtn.addEventListener('click', e => this.deleteNote(e.target)); // add delete event to note btn

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteDescription = document.createElement('p');
  noteDescription.classList.add('note__description');
  noteDescription.textContent = description;

  fragment.appendChild(note);
  note.appendChild(noteContainer);
  noteContainer.appendChild(noteTitle);
  noteContainer.appendChild(noteDescription);
  noteContainer.appendChild(noteDeleteBtn);

  this.notes.appendChild(fragment);
 },
 createNote: function(e) {
  e.preventDefault();
  const title = document.querySelector('.form__input');
  const description = document.querySelector('.form__textarea');

  if (title && description != '') {
   // check if value is not empty
   this.createNodes(title.value, description.value);
   title.value = '';
   description.value = '';
   this.saveNotes();
  }
 },
 deleteNote: function(noteToDelete) {
  const parent = noteToDelete.parentNode.parentNode;
  console.log('deleted');
  this.notes.removeChild(parent);
  this.saveNotes();
 },
 saveNotes: function() {
  console.log('saved notes to local storage');
 },
 init: function() {
  this.bindEvents();
 }
};
app.init();
