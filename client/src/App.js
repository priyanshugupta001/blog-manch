import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import { Dataprovider } from './context/Dataprovider';
import CreatePost from './pages/CreatePost';
import ViewFull from './pages/ViewFull';
import MyPost from './pages/MyPost';
import EditPost from './pages/EditPost';


// const PrivateRoute = ({isUserAuthenticated}) =>{
// return isUserAuthenticated ? (
//   <Outlet/>
// ):
// (
// <Navigate replace to={'/login'}/>  
// )

// }

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false) ;
  const [internetStatus, setInternetStatus] = useState(navigator.onLine);

  useEffect(() => {  // The useEffect hook is used to perform side effects in functional components. It takes two arguments: a function and an array of dependencies. In this case, the dependency array is empty ([]), which means the effect will only run once when the component is mounted.
    const handleOnline = () => {
      setInternetStatus(true);
    };

    const handleOffline = () => {
      setInternetStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return (
    <>
      <Router>   {/*This provides the routing functionality to the application. */}
        <Dataprovider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login setIsUserAuthenticated={setIsUserAuthenticated} />} />
            <Route path='/signup' element={<Signup />} />
            {/* <Route path='/' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated}/>}/> */}

            <Route path='/home' element={<Main />} />
            <Route path='/home/:id' element={<ViewFull />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/post' element={<MyPost />} />
            <Route path='/edit-post/:id' element={<EditPost />} />
            
          </Routes>
        </Dataprovider>
      </Router>
    </>
  );
}

export default App;
