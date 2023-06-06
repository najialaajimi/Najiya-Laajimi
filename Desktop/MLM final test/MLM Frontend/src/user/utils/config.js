

const user = JSON.parse(localStorage.getItem("user"));

export const config = {
  headers: {
    'Authorization': user && user.token ? `Bearer ${user.token}` : '',
    'Accept': 'application/json'
  }
};