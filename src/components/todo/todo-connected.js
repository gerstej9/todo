import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import {Navbar} from 'react-bootstrap';
import './todo.scss';
import useAjax from '../customHooks/useAjax.js'
import SettingsProvider from '../../context/Settings.js'
import axios from 'axios';
import AuthProvider from '../../context/AuthProvider.js';
import Login from '../auth/Login.js';
import Auth from '../auth/Auth.js'

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';



export default function ToDo(){

  // const [api, setAPI] = useState({});
  // const [method, setMethod] = useState({});
  // const[input, setInput] = useState({});

  const [response, request] = useAjax()
  const [list, setList] = useState([]);
  const[data, setData] = useState([]);

  useEffect(() => {
    if(response.results){
      response.results && setData(response.results);
    }else{
      getToDoItems();
    }
  }, [response])
  
  const _addItem = (item) => {
    item.due = new Date();

    let input = {
        text: item.text,
        assignee: item.assignee,
        difficulty: item.difficulty,
        due: item.due,
        _id: item._id
      }

      let options = {
        url: todoAPI,
        method: 'post',
        data: input,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        validateStatus: (status) => {return true},
      }
     request(options);
    // setList([...list, newItem])
  };

  const _toggleComplete =  id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;
      let input = {
        text: item.text,
        assignee: item.assignee,
        difficulty: item.difficulty,
        id: item.id,
        complete: item.complete,
        }
        let option = {
          url: url,
          method: 'put',
          data: input,
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        }
       request(option);
        // setList(list.map(listItem => listItem._id === item._id ? updatedItem : listItem));
    }
  };

  useEffect(() => {
    document.title = `To Do (${data.filter(item => !item.complete).length})`;
  }, [data])

  // const _getTodoItems =  () => {
  //   const options = {
  //     url: todoAPI,
  //     method: 'get',
  //   }
  //   request(todoAPI, 'get', {});

  //     // setList(list.results);
  // };

  useEffect(() => {
    getToDoItems()
  }, []);
  

  const getToDoItems = async item => {
    const request = await axios({
      method: 'get',
      url: todoAPI,
      headers:{},
    });
    // console.log(request);
    const results = request.data.results;
    setList(results);
  }


  const _deleteItem = id => {
    let url = `${todoAPI}/${id}`;
    let options = {
      url:url,
      method: 'delete',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }
    request(options);
    // request({url: todoAPI, method:'get'})
    // options = {
    //   url: todoAPI,
    //   method: 'get'
    // }
    // request(options);
  }


//   <AuthProvider>
//   <Login />
//     <Auth capability="read">
//       <ToDo />
//     </Auth>
// </AuthProvider>

  return (
    <>
    <AuthProvider>
        <header>
          <Navbar style={{color:"white"} }bg="primary" variant="dark" className="headerOne">
            Home
            <Login />
            </Navbar>

          <br></br>
        </header>
      <Auth capability="read">
      <Navbar className="toDoCount" style={{color:"white"}}bg="dark" variant="dark" >
              To Do List Manager({list.filter(item => !item.complete).length})
       </Navbar>
        <section className="todo">
          <Auth capability="create">
          <div className="formGroup">
            <TodoForm callback={_addItem} />
          </div>
          </Auth>
          <SettingsProvider>
            <div className="listGroup">
              <TodoList
                list={list}
                handleComplete={_toggleComplete}
                handleDelete={_deleteItem}
              />
            </div>
          </SettingsProvider>
        </section>
        </Auth>
      </AuthProvider>
    </>
  );
};


