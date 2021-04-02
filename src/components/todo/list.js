import React, {useState, useEffect, useContext} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {SettingsContext} from '../../context/Settings.js';

export default function TodoList({list, handleComplete, handleDelete}){

  let context = useContext(SettingsContext)
  const [page, setPage] = useState(1);
  const [sortedList, setSortedList] = useState(list);
  const [paginatedList, setPaginatedList] = useState(list);
// console.log(paginatedList);
  
  const handleToggle = (e, settings) =>{
    e.preventDefault();
    settings.updateCompleted(settings.completed === 'true' ? 'false' : 'true')
      listDisplayCompleted();
      }

  const handleSort = (e, settings) =>{
    e.preventDefault();
    context.updateSort(e.target.value);
    // listSort();
    // console.log(settings.sort);
  }

  useEffect(() => {
    console.log(context.sort)
    listSort()
  }, [context.sort])

  const handleNumberItems = (e, settings) =>{
    e.preventDefault();
    context.updateNumber(e.target.numberItems.value);
    // console.log(context.numberItems);
    // listPagination();
  }

  useEffect(() => {
    listPagination()
  }, [context.numberItems])

  const pageEdit = (e) => {
    // console.log(e.target.innerText);
    if(e.target.innerText === 'Previous'){
      if(page > 1){
        setPage(page -1 )
      }
    }else{
      setPage(page + 1);
    }
  }

  const listDisplayCompleted = () => {
    // setNewList(newList.filter(item => !item.complete));
    if(context.completed ==='false'){
      setPaginatedList(sortedList);
    }else{
      setPaginatedList(sortedList.filter(item => !item.complete));
    }
  }

  const listSort = () => {
      let param = context.sort;
      console.log(param);
      let nextList = sortedList.sort((l,r) => {
      if(l[context.sort] > r[context.sort]){
        return 1;
      } else if(l[context.sort] < r[context.sort]){
        return -1;
      } else 
      return 0
    });
    console.log(nextList);
    // setSortedList(nextList);
    setPaginatedList(nextList);
  }

  const listPagination = () => {
    console.log(context.numberItems);
    // console.log(sortedList);
    if(sortedList[0]){
      let nextList = [];
      // console.log(list);
      // console.log(settings, page);
      let min = context.numberItems * (page-1)
      let max = (context.numberItems * page);
      for(let i = min; i < max; i++){
        // console.log(sortedList[i])
        // console.log(i);
        nextList.push(sortedList[i]);
        }
      // console.log(nextList);
      setPaginatedList(nextList);
    }
  }

  useEffect(() =>{
    setSortedList(list);
    setPaginatedList(list);
  },[list])

  useEffect(() => {
    listPagination();
    console.log(page);
  }, [page])

  useEffect(() =>{
    listPagination();
  },[])

  // useEffect(() => {
  //   listPagination();
  //   // console.log(page);
  // }, [])

//  let newList = listDisplayCompleted(list);

    
    return (
      <ListGroup as="ul">
        <SettingsContext.Consumer>
          {settings => (
            <div>
              <button onClick={((e) => handleToggle(e, settings))}>Display Completed: {settings.completed}</button>
                <form onSubmit={((e) => handleNumberItems(e, settings))}>
                  <input type="number" name="numberItems" required placeholder={settings.numberItems} ></input>
                  <button type="submit">Items on Page</button>
                </form>
                <select onChange={((e) => handleSort(e, settings))}>
                  <option value="difficulty">Sort By</option>
                  <option name="difficulty" value="difficulty">Difficulty</option>
                  <option name="assignee" value="assignee">Assignee</option>
                  <option name="text" value="text">Task</option>
                </select>
            </div>
          )}
        </SettingsContext.Consumer>
        {paginatedList.map(item => (
          <Card
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <p className ={`${item.complete}`}>{item.complete.toString()}</p>
            <h3>{item.assignee}<span className="delete" onClick={() => handleDelete(item._id)}>X</span></h3>
            <p onClick={() => handleComplete(item._id)} className="task">{item.text}</p>
            <span  className="difficulty">Difficulty: {item.difficulty}</span>
          </Card>
        ))}
        <button onClick={pageEdit}>Previous</button>
        <button onClick={pageEdit}>Next</button>
      </ListGroup>
    );
  }

