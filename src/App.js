import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import JobPage from './pages/JobPage';


function App() {
  return (
    <div className="App" >
     <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/SignUp' element={<SignUpPage></SignUpPage>}></Route>
        <Route path='/JobPage' element={<JobPage></JobPage>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}
export default App;
