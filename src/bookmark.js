import store from './store.js';
import api from './api.js';




function startPage(){
  return  `<h1>My Bookmark</h1><form class="startpageform">
    <button type='submit' class='startpage'> + Add Bookmark</button>
  </form>
  <form>
  <label for='filterby'></label>
  <select name="filterby" class="filterBy">
  <option value = 0 >Filter By Minimum Rating</option>
  <option value = 5 >&#11088;&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 4 >&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 3 >&#11088;&#11088;&#11088; </option>
  <option value = 2 >&#11088;&#11088; </option>
  <option value = 1 >&#11088; </option>
  </select></form>`; 
}
 
    
function addBookmarkbutton(){
  $('.startpageform').on('submit', function(event){
    event.preventDefault();
    store.storeObj.adding = true; 
    render();
  }); 
}

function addBookmarkPage(){
  return `<form class="addBookmarkForm" >
  <label for ="title"> Create new  bookmark</label></br>
  <input type="text" name="title" class= "title" placeholder = "Title" required></br>
  <label for='select rating' >Book rate: </label></br>
  <select name='select rating'class='selectRate' required>
  <option value =''> Rating</option>
  <option value = 5 >&#11088;&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 4 >&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 3 >&#11088;&#11088;&#11088; </option>
  <option value = 2 >&#11088;&#11088; </option>
  <option value = 1 >&#11088; </option>
  </select></br>
  <label for="Website Url">Website: </label> </br>
  <input type="url" name="Website Url" class="webUrl" placeholder="http://example.com" required></br>
  <label for="textArea" >Description:<label></br>
  <textarea class="textArea" name ="textArea" rows="4" cols="50">
  </textarea></br>
  <button type="submit" name='savebutton' class="save" >Save</button>
  <button type="submit" name='cancelbutton' class="cancel">Cancel</button>
  <p>${store.storeObj.error}</p>
  </form>`;
}


function saveBookmarkbutton(){
  $('.addBookmarkForm').on('submit',function(event){
    event.preventDefault();
    let ntitle = $('.title').val();
    let nurl = $('input[type="url"]').val();
    let ndescription = $('.textArea').val();
    let nrating = $('.selectRate option:checked').val();
    let newItem={id:cuid(), title:ntitle, url:nurl, desc: ndescription, rating: nrating, expanded: false, edit:false};
    api.createItem(newItem)
      .then(newItem => {
        store.addItem(newItem);
        store.storeObj.adding = false;
        render();
      })
      .catch(error => {
        store.storeObj.error = error;
        render();
        console.log(error);
      });
     
  }); 
  
}

function cancelbutton(){
  $('.cancel').on('click',function(event){
    event.preventDefault();
    store.storeObj.adding = false;  
    render();
    
  });
}


function canceleditbutton(){
  $('.canceledit').on('click',function(event){
    event.preventDefault();
    $('.editformPage').attr('hidden', true);
    render();
    
  });
}

function generateItemList(item) {
  let desc = '';
  let buttonName ='Show detail';
  let url ='';
  let deleteButton = '';
  let editButton = '';
  let saveEditbutton = '';
  
  if(item.expanded === true){
    desc = `<div><label for="description">Description:</label> ${item.desc}</div>`;
    buttonName ='Show less';
    url = `<a href="${item.url}"><button>Visit Site</button></a>`;
    deleteButton = '<button class="deleteItem">Delete <i class="fa fa-trash-o"></i></button>';
    editButton = '<button class="editItem"> <span id="openclose">Edit/Close</span></button>';
    saveEditbutton ='<button class="saveedit" default>Save Edit</button>';
  }
  return `<li class='bm-expand-element' data-item-id='${item.id}'>
  
    <h3>${item.title}</h3>
    <p>${item.rating} &#11088;</p>
    <p name="discription">${desc}</p>
    <p> ${url}${deleteButton}${editButton}${saveEditbutton}</p>   
    <button type='button' class='moreLessButton'> ${buttonName} </button>
    <form class="editformPage" ${!item.edit ? 'hidden' : ' '}  >
    <h3>Edit rating and description:</h3></br>
    <label for='select rating' >Book rate: </label></br>
    <select name='select rating'class='editselectRate' required>
    <option value =''> Rating</option>
    <option value = 5 >&#11088;&#11088;&#11088;&#11088;&#11088; </option>
    <option value = 4 >&#11088;&#11088;&#11088;&#11088; </option>
    <option value = 3 >&#11088;&#11088;&#11088; </option>
    <option value = 2 >&#11088;&#11088; </option>
    <option value = 1 >&#11088; </option>
    </select></br>
    <label for="textArea" >Description:<label></br>
    <textarea class="edittextArea" name ="textArea" rows="4" cols="50">
    </textarea></br>
    <button type="submit" name='cancelbutton' class="canceledit">Cancel </button>
    </form></li>`;
    
}

function generateBookmarkItemString(list){
  const items = list.map((item) => generateItemList(item));
  return items.join('');
}  

function getItemIdFromElement(item){
  return $(item).closest('li').data('item-id');
}

function expandbutton(){
  $('.bookmarkList').on('click','.moreLessButton',function(event){
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);//id
    const item = store.findById(id);//item object
    if(id === item.id){
      item.expanded = !item.expanded;
    }
    render();
  });
        
}

function deletebutton(){
  $('.bookmarkList').on('click','.deleteItem',function(event){
    event.preventDefault();
    const deleteId = getItemIdFromElement(event.currentTarget);//id
    api.deleteItem(deleteId)
      .then(res => res.json())
      .then(() => {
        store.removeItem(deleteId);
        render();
      }); 
  });
}

function editbutton(){
  $('.bookmarkList').on('click','.editItem',function(event){
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);//id
    const item = store.findById(id);//item object
    if(id === item.id){
      item.edit = !item.edit;
      console.log(id);
    }
    render();
  });
}    

function saveEditbutton(){
  $('.bookmarkList').on('click','.saveedit',function(event){
    event.preventDefault();
    let ndescription = $('.edittextArea').val();
    let nrating = $('.editselectRate option:checked').val();
    let revisedItem = { rating:nrating, desc:ndescription};
    const id = getItemIdFromElement(event.currentTarget);
   // $('editformPage').attr('hidden', true);
    api.editItem(id, revisedItem)
      .then(revised  => {
        console.log(revised);
        store.editItem(id,revisedItem);
        render();
      })
      .catch(error => {
        store.storeObj.error = error;
        render();
        console.log(error);
      });
  });
}


      
    
  


function selectRate(){
  $('.filterBy').change(function(){
    event.preventDefault();
    store.storeObj.filter = $('.filterBy option:checked').val();
    render();
  });

}

function render(){
  console.log(store.storeObj);
  let items = [...store.storeObj.bookmarks];

  if(store.storeObj.adding){
    $('main').html(addBookmarkPage()) ;
    cancelbutton();
    saveBookmarkbutton();
  }else{
    $('.addBookmarkForm').remove();
  }

  if(store.storeObj.filter > 0){
    items = store.storeObj.bookmarks.filter(bookItem => bookItem.rating >= store.storeObj.filter);
  }
  
  

  $('ul').html(generateBookmarkItemString(items));
    
}

function bindEventListeners(){
  addBookmarkbutton();  
  cancelbutton();
  saveBookmarkbutton();
  expandbutton();
  deletebutton();
  selectRate();
  editbutton();
  canceleditbutton();
  saveEditbutton();
}
export default{
  startPage,
  bindEventListeners,
  render
  
};  
