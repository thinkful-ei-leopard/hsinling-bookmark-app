
import $ from 'jquery';
import './index.css';
import store from './store';
import bookmark from './bookmark';
import api from './api';






function main(){
  $('header').html(bookmark.startPage());
  bookmark.addBookmarkbutton();
  bookmark.saveBookmarkbutton();
 
    
}








$(main());