const app = {
 data: [],
 getElement: function(classname) { // arg1: classname of tag you want get sytnax: '.classname'
  const tag = document.querySelector(classname);
  return tag;
 },
 showAbout: function() {
  this.getElement('.about').classList.add('about__active');
 },
 closeAbout:function(){
  this.getElement('.about').classList.remove('about__active');
 },
 bindEvents: function() {
  this.getElement('.nav__btn').addEventListener('click',this.showAbout.bind(this));
  this.getElement('.about__close').addEventListener('click',this.closeAbout.bind(this));
  this.getElement('.form').addEventListener('submit', this.createNote.bind(this));
 },
 createNote:function(e){
  e.preventDefault();
  const title = e.target[0];
  const description = e.target[1];
  if(title.value != '' && description.value != ''){
   this.createNodes(title.value, description.value);
   this.saveNoteToData(title.value, description.value);
   title.value = '';
   description.value = '';
  }
 },
 createTag:function(tagName, tagClass, tagText){ // arg1: html tag name e.g p, ul,li, arg2: classname of tag you can leave empty, arg3: text of tag also you can leave empty
  const tag = document.createElement(tagName);
  tag.classList.add(tagClass);
  tag.textContent = tagText;
  return tag;
 },
 appendChildrens:function(parentTag, childrens){ // arg1: createdTag arg2: array of childrens(createdTags) to append
   for(let i = 0; i<childrens.length; i++){
    parentTag.appendChild(childrens[i]);
   }
   return parentTag;
 },
 createNodes:function(noteTitle, noteDescription){
  const fragment = document.createDocumentFragment(),
   li = this.createTag('li', 'note'),
   div = this.createTag('div', 'note__container'),
   deleteBtn = this.createTag('button','note__deleteBtn'),
   h2 = this.createTag('h2', 'note__title', noteTitle),
   p = this.createTag('p', 'note__description', noteDescription);
   
  deleteBtn.addEventListener('click', e=>this.deleteNote(e.target)); // delete note

  fragment.appendChild(li);
  li.appendChild(div);
  this.appendChildrens(div, [deleteBtn, h2, p]);
  this.getElement('.notes').appendChild(fragment);
 },
 deleteNote:function(target) {
  const noteToDelete = target.parentNode.parentNode;
  this.getElement('.notes').removeChild(noteToDelete);
  console.log('note has been deleted');
  this.deleteNoteFromStorage(target);
 },
 saveNoteToData:function(noteTitle,noteDescription ){
  const note = {
   title: noteTitle,
   description: noteDescription
  };
  this.data.push(note);
  this.saveNoteToLocalStorage();
 },
 saveNoteToLocalStorage:function(){
  localStorage.setItem('notes', JSON.stringify(this.data));
  console.log('note has been saved to storage');
 },
 checkIfDataIsEmpty:function(){
  if(localStorage.getItem('notes')){
   const notes = localStorage.getItem('notes');
   this.data = JSON.parse(notes);
   console.log('data has been updated');
   this.renderNotes();
   console.log('notes has been rendered');
  }
 },
 deleteNoteFromStorage:function(target){
  const title = target.nextSibling.textContent;
  const newData = this.data.filter(note=>{
    return note.title != title
  });
  this.data = newData;
  this.saveNoteToLocalStorage();
 },
 renderNotes:function(){
  this.data.forEach(note=>{
    this.createNodes(note.title,note.description);
  });
 },
 init: function() {
  this.bindEvents();
  this.checkIfDataIsEmpty();
 }
};
app.init();