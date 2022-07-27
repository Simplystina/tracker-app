import React from 'react';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import { LandingPage, Register, Dashboard, Applications, Feeds, AccountProfile} from './Pages/index'
import './index.css'
import UserProvider from './context/user/userContext';
import { Overview } from './components/Index';
import ApplicationProvider from './context/application/applicationContext';
function App() {
  return (
    <>
    <Router>
     
          <Routes>
            <Route path='/' element={ <UserProvider><LandingPage/></UserProvider>}/>
            <Route path='/login' element={<Register/>}/>
            <Route  path='/dashboard' element={<UserProvider><Dashboard/></UserProvider>}>
              <Route path='overview' index element={<ApplicationProvider><Overview/></ApplicationProvider>}/>
              <Route  path='applications' element={<ApplicationProvider><Applications/></ApplicationProvider>}/>
              <Route  path='feeds' element={<Feeds/>}/>
              <Route  path='account' element={<AccountProfile/>} />
            </Route>
          </Routes>
    </Router>
  
    </>
  );
}

export default App;
