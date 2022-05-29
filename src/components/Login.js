import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from './firebaseConfig.js'
import { useState } from "react";

const Login = ({ page }) => {
  initializeApp(firebaseConfig);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isUserExist, setUserExist ] = useState(false);
  console.log(location);
  const auth = getAuth();
  const onSignInClickHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then( auth => {
      if(auth){
        navigate('/dashboard');
      }
    })
    .catch( error => setUserExist(true));
    // user-not-found
  }

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  return(
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{ page ? 'Sign In' : 'Register'}</h1>
        <br/>
        <form>
          <input className="form-control" value={email} onChange={emailOnChangeHandler} type="email" placeholder="Email"/>
          <input 
            className="form-control" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            type="password" 
            placeholder="Password"/>
          <button className="btn btn-danger btn-block" onClick={onSignInClickHandler}>
            { page ? 'Sign In' : 'Register'}
          </button>
          <br/>
          {
            page && <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
              Remember Me
            </label>
          </div>
          }
        </form>
        <br/>
        <br/>
        { isUserExist && <p className="text-danger">User does not exist | Go for Signup</p> }
        <div className="login-form-other">
          <div className="login-signup-now">
          { page ? 'New to Netflix?' : 'Existing User'} &nbsp;
            <Link className=" " to={page ? '/register' : '/login'}>
              { page ? 'Sign up now' : 'Sign In'}
            </Link>.
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
    </div>
  )
}

export default Login;