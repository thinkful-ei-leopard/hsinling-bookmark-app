
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/hsinling/boolmarks';

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
        error.message =data.message;
        return Promise.reject(error);
      }

      return data;
    });
};

function getItems(){
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

function createItem(item){
  let newItem ={ 
    title: item.title, 
    url:item.url, 
    description: item.description, 
    rating: item.rating, 
  };
  newItem = JSON.stringify(newItem);
  return fetch(`${BASE_URL}/bookmarks`,{
    method:'POST',
    headers:{ 'Contenet-Type': 'application/json'},
    body: newItem
  });
}

function deleteItem(id){
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}

export default{
  getItems,
  createItem,
  deleteItem
};