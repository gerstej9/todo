import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default function TodoList({list, handleComplete}){
    return (
      <ListGroup as="ul">
        {list.map(item => (
          <Card
            className={`complete-${item.complete.toString()}`}
            onClick={() => handleComplete(item._id)}
            key={item._id}
          >
            <p className ={`${item.complete}`}>{item.complete.toString()}</p>
            <h3>{item.assignee}<span>X</span></h3>
            <p className="task">{item.text}</p>
            <span className="difficulty">Difficulty: {item.difficulty}</span>
          </Card>
        ))}
      </ListGroup>
    );
  }

