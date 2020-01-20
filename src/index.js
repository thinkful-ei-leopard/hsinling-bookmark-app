
import $ from 'jquery';
import './index.css';
import bookmark from './bookmark';
import api from './api';
import store from './store';






function main(){
  api.getItem()
    .then(res =>res.json())
    .then((items) => {
      items.forEach((item)=> store.addItem(item));
      bookmark.render();
    });

  $('header').html(bookmark.startPage());
  bookmark.bindEventListeners();
  bookmark.render();
}


$(main);