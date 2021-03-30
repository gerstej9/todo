import React from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import {useEffect, useState } from 'react';
import NavBar from 'react-bootstrap/NavBar';

import './todo.scss';

export default function ToDo (){

  const [list, setList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      setList(list.map(listItem => listItem._id === item._id ? item : listItem));
    }

  };

    useEffect(() => {
      setList(
        [
          { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
          { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
          { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
          { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
          { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
          ]
      )
    }, []);

    useEffect(() => {
      document.title = `To Do (${list.filter(item => !item.complete).length})`;
    }, [list])

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
            <TodoForm addItem={addItem} />
          </div>

          <div className="listGroup">
            <TodoList
              list={list}
              handleComplete={toggleComplete}
            />
          </div>
        </section>
      </>
    );
  }
