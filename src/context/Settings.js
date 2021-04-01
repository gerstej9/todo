import React, { useState, useEffect } from 'react';

export const SettingsContext = React.createContext();


function SettingsProvider(props) {
  
  let [sort, setSort] = useState('difficulty');
  let [completed, setCompleted] = useState('true');
  let[numberItems, setNumberItems] = useState(3);
  
  const state = {
      sort,
      completed,
      numberItems,
      updateSort: setSort,
      updateCompleted: setCompleted,
      updateNumber: setNumberItems,
    }

  useEffect(() =>{ 
    console.log(completed);
  }, [completed])

  // useEffect(() =>{ 
  //   console.log(sort);
  // }, [sort])

  useEffect(() =>{ 
    console.log(numberItems);
  }, [numberItems])

    return(
      <SettingsContext.Provider value={state}>
        {props.children}
      </SettingsContext.Provider>
    );
}

export default SettingsProvider;
