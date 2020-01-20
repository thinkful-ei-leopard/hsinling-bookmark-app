import store from './store';
import $ from 'jquery';
import cuid from 'cuid';
import api from './api';




function startPage(){
  return  `<h1>My Bookmark</h1><form class="startpageform">
    <button type='submit' class='startpage'> + Add Bookmark</button>
  </form>
  <form>
  <select name="filterby"class="filterBy">
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
  <label for ="add new bookmark">Create new  bookmark</label></br>
  <input type="text" name="title" class= "title" placeholder = "Title" required></br>
  Book rate:
  <select name='select rating'class='selectRate' required>
  <option value =''> Rating</option>
  <option value = 5 >&#11088;&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 4 >&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 3 >&#11088;&#11088;&#11088; </option>
  <option value = 2 >&#11088;&#11088; </option>
  <option value = 1 >&#11088; </option>
  </select></br>
  Website:
  <input type="url" name="webUrl" class="webUrl" placeholder="http://example.com" required></br>
  Description:</br>
  <textarea class="textArea" name ="textArea" rows="4" cols="50">
  </textarea></br>
  <button type="submit" class="save" >Save</button>
  <button type="submit" class="cancel">Cancel</button>
  </form>`;
}



function saveBookmarkbutton(){
  $('.addBookmarkForm').on('submit',function(event){
    event.preventDefault();
    let ntitle = $('.title').val();
    let nurl = $('input[type="url"]').val();
    let ndescription = $('.textArea').val();
    let nrating = $('.selectRate option:checked').val();
    let newItem={id:cuid(), title:ntitle, url:nurl, description: ndescription, rating: nrating, expanded: false};
    api.createItem(newItem)
      .then(res => res.json())
      .then(newItem => {
        store.addItem(newItem);
        store.storeObj.adding = false;
        render();
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


function generateItemList(item) {

  
  let description = '';
  let buttonName ='Show detail';
  let url ='';
  let deleteButton = '';

  if(item.expanded === true){
    description = `<div><label>Description:</label> ${item.description}</div>`;
    buttonName ='Show less';
    url = `<a href="${item.url}"><button>Visit Site</button></a>`;
    deleteButton = '<button class="deleteItem">Delete</button>';
  }
  return `<li class='bm-expand-element' data-item-id='${item.id}'>
    <h3>${item.title}</h3>
    <p>${item.rating} Stars</p>
    <p>${description}</p>
    <p> ${url}${deleteButton}</p>
    <button type='button' class='moreLessButton'> ${buttonName} </button>
  </li>`;
    
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

function selectRate(){
  $('.filterBy').click(function(){
    event.preventDefault();
    store.storeObj.filter = $('.filterBy option:checked').val();
    //$('.filterBy option:checked').val('');   
    render();
  });

}

function render(){
  let items = [...store.storeObj.bookmarks];

  if(store.storeObj.adding){
    $('main').html(addBookmarkPage()) ;
    cancelbutton();
    saveBookmarkbutton();
  }else{
    $('.addBookmarkForm').remove();
  }

  if(store.storeObj.filter > 0){
    selectRate();
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
  
}
export default{
  startPage,
  bindEventListeners,
  render
  
};  
