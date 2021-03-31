import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import NavBar from 'react-bootstrap/NavBar';
import './todo.scss';
import axios from 'axios';
import useAjax from '../customHooks/useAjax.js'

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


export default function ToDo(){

[_addItem, _toggleCompleted, _getTodoItems] = useAjax();



  const [list, setList] = useState([]);

  const _addItem = async (item) => {
    item.due = new Date();
    let newItem = await axios({
      method: 'post',
      url: todoAPI,
      data: {
        text: item.text,
        assignee: item.assignee,
        difficulty: item.difficulty,
        due: item.due,
        complete: item.completed,
        _id: item._id
      },
    })
    .catch(console.error);
    newItem = useAjax(url, method, body)
    setList([...list, newItem.data])
  };

  const _toggleComplete = async id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      let updatedItem = await axios({
        method: 'put',
        url: url,
        data: {
          text: item.text,
          assignee: item.assignee,
          difficulty: item.difficulty,
          id: item.id,
          complete: item.complete,
        }
      })
        .catch(console.error);
        setList(list.map(listItem => listItem._id === item._id ? updatedItem.data : listItem));
    }
  };

  useEffect(() => {
    document.title = `To Do (${list.filter(item => !item.complete).length})`;
  }, [list])

  const _getTodoItems = async () => {
    let list = await axios({
      method: 'get',
      url: todoAPI,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .catch(console.error);
      console.log(list);
      setList(list.data.results);
  };

  useEffect(() => {
    _getTodoItems()
  }, []);

  return (
    <>
        <header>
          <NavBar className="headerOne"style={{color:"white"}}bg="primary" variant="dark" >Home</NavBar>
          <br></br>
          <NavBar className="toDoCount" style={{color:"white"}}bg="dark" variant="dark" >
              To Do List Manager({list.filter(item => !item.complete).length})
          </NavBar>
        </header>

        <section className="todo">

          <div className="formGroup">
            <TodoForm callback={_addItem} />
          </div>

          <div className="listGroup">
            <TodoList
              list={list}
              handleComplete={_toggleComplete}
            />
          </div>
        </section>
    </>
  );
};


