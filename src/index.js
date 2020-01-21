

import bookmark from './bookmark.js';
import api from './api.js';
import store from './store.js';






function main(){
  api.getItems()
    .then((items) => {
      items.forEach((item)=> store.addItem(item));
      bookmark.render();
    });

  $('header').html(bookmark.startPage());
  bookmark.bindEventListeners();
  bookmark.render();
}


$(main);