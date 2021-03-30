import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function TodoList({list, handleComplete}){
    return (
      <ListGroup as="ul">
        {list.map(item => (
          <ListGroup.Item as="li"
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => handleComplete(item._id)}>
              {item.text} assigned to {item.assignee}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

