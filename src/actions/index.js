import { ADD_POST, DELETE_POST, FETCH_POST } from './types';
import axios from 'axios';

const apiUrl = ' http://localhost:3006';


export const createPost = ({comments }) => {
    console.log("comments : -", comments);
    const requestOptions = {
    method: 'POST',
    headers: { 'Access-Control-Allow-Origin Content-Type': 'application/json' },
    body: JSON.stringify({ comments})
 };

 return fetch(`${apiUrl}/comments`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           // localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}
function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              // logout();
              // location.reload(true);
          }
      }
      return data;
  });
}
// export const createPost = ({comments }) => {
//   return (dispatch) => {
//     return axios.post(`${apiUrl}/comments`, {comments})
//       .then(response => {
//         dispatch(createPostSuccess(response.data))
//       })
//       .catch(error => {
//         throw(error);
//       });
//   };
// };

export const createPostSuccess =  (data) => {
  return {
    type: ADD_POST,
    payload: {
      _id: data._id,
      title: data.title,
      body: data.body
    }
  }
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

export const deletePost = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchPosts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};