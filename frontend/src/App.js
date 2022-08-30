import {BrowserRouter, Route,Routes,} from "react-router-dom"
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChatroomPage from "./pages/ChatroomPage";
import IndexPage from "./pages/IndexPage";
import {SocketContext, socket} from './context/socket';
import  '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

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
