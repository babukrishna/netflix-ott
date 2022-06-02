import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { firebaseConfig } from './firebaseConfig.js'
import { useEffect, useState } from "react";

const Login = () => {
  initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === '/login' ? true:false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isUserExist, setUserExist ] = useState(false);
  const [ isEmailUsed, setIsEmailUsed] = useState(false);
  const auth = getAuth();

  const ctaClickHandler = (e) => {
    e.preventDefault();

    if(page){
      signInWithEmailAndPassword(auth, email, password)
      .then( auth => {
        if(auth){
          navigate('/dashboard');
        }
      })
      .catch( error => setUserExist(true));
      // user-not-found
    }else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(
        auth => {
          if(auth){
            navigate('/dashboard')
          }
        })
        .catch( error => setIsEmailUsed(true));
    }
  }

  useEffect(()=>{
    setUserExist(false);
    setIsEmailUsed(false);
  },[location])
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  return(
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{ page ? 'Sign In' : 'Register'}</h1>
        <br/>
        <form>
          <input 
            className="form-control" 
            value={email} 
            onChange={emailOnChangeHandler} 
            type="email" 
            placeholder="Email"/>
          <p className="text-danger">Email is not valid</p>
          <input 
            className="form-control"
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            type="password" 
            placeholder="Password"/>
            <p className="text-danger">Password is not valid</p>
          <button className="btn btn-danger btn-block" onClick={ctaClickHandler}>
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
        { isEmailUsed && <p className="text-danger">Email already in use | Go for Sign In</p> }
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