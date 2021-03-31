import { useState} from 'react';
import axios from 'axios';

const useAjax = ( ) => {
  const [data, setData] = useState({});

  //get list initially => set data to the list
  // add item => set data to the item
  // toggle complete => set data to the item toggled

  const request =  async (api, method, input) => {
    let newItem = await axios({
      method: method,
      url: api,
      data: input,
    })
    setData(newItem.data);
    return newItem.data;
    };
  return [
    data,
    request];
}

export default useAjax;