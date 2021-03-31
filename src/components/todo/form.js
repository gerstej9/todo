import React from 'react';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import useForm from '../customHooks/useForm.js';

export default function TodoForm({callback}){

  const [handleInputChange, handleSubmit] = useForm(callback);

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
