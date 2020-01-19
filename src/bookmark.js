import store from './store';
import $ from 'jquery';
import cuid from 'cuid';
import api from './api';


export default{
  startPage,
  addBookmarkbutton,
  saveBookmarkbutton,
  render
};

function startPage(){
  return  `<h1>My Bookmark</h1><form class="startpageform">
    <button type='submit' class='startpage'> + Add Bookmark</button>
  </form>
  <form>
  <select>
  <option>Filter By Minimum Rating</option>
  <option value = 5 >&#11088;&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 4 >&#11088;&#11088;&#11088;&#11088; </option>
  <option value = 3 >&#11088;&#11088;&#11088; </option>
  <option value = 2 >&#11088;&#11088; </option>
  <option value = 1 >&#11088; </option>
  </select></form>`; 
}
 
    
function addBookmarkbutton(){
  $('.startpageform').on('submit', function(){
    event.preventDefault();
    store.storeObj.adding = true; 
    render();
  }); 
}

function addBookmarkPage(){
  return `<form class="addBookmarkForm" >
  <label>Create new  bookmark</label></br>
  <input type="text" name="title" class= "title" placeholder = "Title" required></br>
  Book rate:
  <select class=selectRate>
  <option> Rating</option>
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
  <form>
  <button type="button" class="cancel">Cancel</button>
  </form>
  </form>`;
}

function saveBookmarkbutton(){
  $('.addBookmarkForm').on('submit', function(event){
    event.preventDefault();
    let ntitle = $('input[type="test"]').val();
    let nurl = $('input[type="url"]').val();
    let ndescription = $('.textArea').val();
    let nrating = $('.selectRate option:checked').val();
    let newItem={id:cuid(), title:ntitle, url:nurl, description: ndescription, rating: nrating, expanded: false};
    store.addItem(newItem);
    store.storeObj.adding = false; 
    render();
    
  }
  ); 
}

const generateItemList = function (item) {
  return ` <li class='bm-item-element' data-item-id='${item.id}'>
          <h4>${item.title}</h4>
          <div class='shopping-item-controls'>
             <p>${item.rating}</p>
            <button type='click' class='expanedB'> + </button>
          </div>
        </li>`;
};
  
function generateBookmarkItemString(list){
  const items = list.map((item) => generateItemList(item));
  return items.join('');
}

  
  


function expandItem(item){
  return `<li class='bm-item-element' data-item-id='${item.id}'>
    <h4>${item.title}</h4>
    <p>${item.rating} Stars</p>
    <p>${item.description}</p>
    <p> ${item.url}</p>
    <form class='cancelform' ><button type="submit" class="cancel" name="cancel">close</button></form>
    <form class='deleteform'><button type="submit" class="delete" name="delete">delete</button></form>
    <form class='visitform'><button type="submit" class="visitsite" name="visitsite">Visit Site</button></form>    
  </li>`;
}



function cancelbutton(){
  $('.addBookmarkForm').on('click', function(event){
    event.preventDefault();
    console.log('hi');
    render();
  });
}

function render(){
  let items = [...store.storeObj.bookmarks];
  
  if(store.storeObj.adding === true){
    $('main').html(addBookmarkPage()) ;
  }
 
  $('ul').html(generateBookmarkItemString(items));
  
  
  
  

}

