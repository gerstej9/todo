import { useEffect, useState} from 'react';
import axios from 'axios';

const useAjax = ( ) => {
  const [options, request] = useState([]);
  const [response, setResponse] = useState({});
  


useEffect(() => {
  async function getData(){
    console.log(options);
    if(!options.url){return};
    try{
      let response = await axios({
        method: options.method,
        url: options.url,
        data: options.input,
        headers: options.headers,
        validateStatus: options.validateStatus,
        mode: options.mode,
      })
      console.log(response);
      setResponse(response.data)
    }catch(error){
      console.log(error);
    }
  }
  getData();
}, [options])


  // const request =  async (api, method, input) => {
  //   let newItem = await axios({
  //     method: method,
  //     url: api,
  //     data: input,
  //   })
  //   setData(newItem.data);
  //   return newItem.data;
  //   };
  return [
    response,
    request];
}

export default useAjax;