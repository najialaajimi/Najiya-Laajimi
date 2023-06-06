/* const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
 */

 const user = JSON.parse(localStorage.getItem("user"));

export const config = {
  headers: {
    'Authorization': user && user.token ? `Bearer ${user.token}` : '',
    'Accept': 'application/json'
  }
};
 


/* 
const getTokenFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
:null;

export const config = {
    headers: {
        'Authorization': `Bearer ${getTokenFromLocalStorage.token}`,
        'Accept'       : 'application/json'
       }
}; */