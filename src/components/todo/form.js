import React from 'react';
import { useState } from 'react';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function TodoForm({addItem}){

  let [item, setItem] = useState({});
  const handleInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value } );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    addItem(item);
    setItem({});
  };
    return (
      <>
        <Card style={{ width: '18rem' }}>
        <h3>Add To Do Item</h3>
          <Form onSubmit={handleSubmit}>
            <label>
              <span>To Do Item</span>
              <input data-testid="toDoItem"
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Assigned To</span>
              <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
            </label>
            <label>
              <span>Difficulty Rating</span>
              <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
            </label>
            <Button data-testid="clickButton" variant="primary" type="submit">Add Item</Button>{' '}
          </Form>
        </Card>

      </>
    );
  }
