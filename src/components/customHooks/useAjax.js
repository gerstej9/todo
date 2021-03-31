import { useState} from 'react';
import axios from 'axios';

const useAjax = (url, method, item ) => {

  const [list, setList] = useState([]);

  const _addItem = async (item, url, method) => {
    item.due = new Date();
    let newItem = await axios({
      method: method,
      url: url,
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
    setList([...list, newItem.data])
  };

  const _toggleComplete = async id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${url}/${id}`;

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


  const _getTodoItems = async () => {
    let list = await axios({
      method: method,
      url: url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .catch(console.error);
      console.log(list);
      setList(list.data.results);
  };

  return [
    _addItem,
    _toggleComplete,
    _getTodoItems,
  ]

}

export default useAjax;