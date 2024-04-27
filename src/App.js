import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import JobPage from './pages/JobPage';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';


function App() {
  return (
    <div className="App" >
     <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<LoginPage/>}></Route>
        <Route path='/SignUp' element={<SignUpPage/>}></Route>
        <Route path='/JobPage' element={<JobPage/>}></Route>
        <Route path='/AddJob' element={<AddJob/>}></Route>
        <Route path='/jobDetails' element={<JobDetails/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}
export default App;
