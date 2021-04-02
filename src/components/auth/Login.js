import {useContext} from 'react';
import { AuthContext} from '../../context/AuthProvider.js';
import useForm from '../customHooks/useForm.js';

function If({condition, children}){
  return condition ? children : null;
}

function Login(){

  let context = useContext(AuthContext);
  let [handleChange, handleSubmit] = useForm(handleLogin);

  function handleLogin(userDetails){
    context.login(userDetails.username, userDetails.password);
  }

  return(
    <>
      <If condition={!context.token} >
        <form onSubmit={handleSubmit}>
          <input name="username" onChange={handleChange} />
          <input name="password" onChange={handleChange} />
          <button type = "submit">Login</button>
        </form>
      </If>
      <If condition={context.token}>
        <button onClick={context.logout}>Logout</button>
      </If>
    </>
  )
}

export default Login;

