import {useContext} from 'react';
import { AuthContext} from '../../context/AuthProvider.js'
import jwt from 'jsonwebtoken';

function If({ condition, children }) {
  return condition ? children : null;
}

function Auth({ capability, children }) {

  let context = useContext(AuthContext);
  const isAuthorized = (capability) => {
    let userData = jwt.decode(context.token);
    if (userData) {
      console.log(userData.capabilities);
      return userData.capabilities.includes(capability) ? true : false;
    }
    return false
  }

  return (
    <>
      <If condition={isAuthorized(capability)}>
        {children}
      </If>
    </>
  )
}

export default Auth;