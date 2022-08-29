import {BrowserRouter, Route,Routes,} from "react-router-dom"
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChatroomPage from "./pages/ChatroomPage";
import { useEffect, useState } from "react";
import IndexPage from "./pages/IndexPage";
import io from "socket.io-client"
import makeToast from "./Toaster.js";
import {SocketContext, socket} from './context/socket';

function App() {
 

  return (
  <SocketContext.Provider value={socket}>

   <BrowserRouter>
    <Routes>
      
*      <Route path='/'  element={<IndexPage/>}></Route>
      <Route path='/login'  element={<LoginPage  />}></Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
      <Route path='/dashboard' element={<DashboardPage  />}></Route>
      <Route path='/chatroom/:id'  exact element={<ChatroomPage   />}></Route>
    </Routes>
   </BrowserRouter>
   </SocketContext.Provider>
  );
}

export default App;
