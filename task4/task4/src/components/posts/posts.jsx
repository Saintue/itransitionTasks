import axios from 'axios';
import { Component } from 'react';

const baseURL = 'http://localhost:5000';
export class Posts extends Component {
  static getUsers = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseURL}/api/users`)
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  static registerUser = user => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}/api/register`, user)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  static loginUser = user => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}/api/login`, user)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  static updateUsers = (users, type) => {
    if (type === 'block') {
      for (let i = 0; i < users.length; i++) {
        users[i].status = 'false';
      }
      console.log(users[0]);
      axios
        .put(`${baseURL}/api/block`, users)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (type === 'unBlock') {
      for (let i = 0; i < users.length; i++) {
        users[i].status = 'true';
      }
      axios
        .put(`${baseURL}/api/unBlock`, users)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  static deleteUsers = users => {
    for (let i = 0; i < users.length; i++) {
      axios
        .delete(`${baseURL}/api/delete/${users[i]._id}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}
