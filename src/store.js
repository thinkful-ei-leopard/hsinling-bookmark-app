
  

const storeObj = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

const findById = function (id) {
  return storeObj.bookmarks.find(currentItem => currentItem.id === id);
};

const  addItem = function (item) {
  storeObj.bookmarks.push(item);
};


export default{
  storeObj,
  findById,
  addItem
  
};


  


 
