
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/hsinling';

const listApiFetch = function(...args){
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok){
        error ={code:res.status};

        if(!res.headers.get('content-type').includes('json')){
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }

      return res.json();
    })

    .then(data => {
      if(error){
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
};

function getItems(){
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

function createItem(newBookmark){
  
  newBookmark = JSON.stringify(newBookmark);
  return listApiFetch(`${BASE_URL}/bookmarks`,{
    method:'POST',
    headers:{ 'Content-Type' : 'application/json'},
    body: newBookmark
  });
}


function editItem(id, editbookmark){
  
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers:{ 'Content-Type' : 'application/json'},
    body: JSON.stringify(editbookmark)
  });
}


function deleteItem(id){
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}

export default{
  getItems,
  createItem,
  editItem,
  deleteItem
};