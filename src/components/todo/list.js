import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function TodoList({list, handleComplete}){
    return (
      <ListGroup as="ul">
        {list.map(item => (
          <ListGroup.Item as="li"
            className={`complete-${item.complete.toString()}`}
            onClick={() => handleComplete(item._id)}
            key={item._id}
          >
            {item.text} assigned to {item.assignee}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

