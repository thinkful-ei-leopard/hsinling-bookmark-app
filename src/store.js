
  

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
  try{
    storeObj.bookmarks.push(item);
  }catch(error){
    console.log(error.message);
  }
};

const removeItem = function(itemId){
  const indexItem = storeObj.bookmarks.findIndex(item =>item.id === itemId );
  storeObj.bookmarks.splice(indexItem,1);
};

export default{
  storeObj,
  findById,
  addItem,
  removeItem 
};



