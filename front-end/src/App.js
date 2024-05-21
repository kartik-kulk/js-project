import './App.css';
import Nav from './Components/Nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/pvtComp';
import Login from './Components/Login';
import Welcome from './Components/WelcomeBak';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateComponent';

function App() {
  return (
    <body className='WebBackground'>
    <div className="App">
      <BrowserRouter  >
      <Nav />
      <Routes>
        <Route element= {<PrivateComponent/>}>
        <Route path ="/" element= {<ProductList />} />
        <Route path ="/Add" element= {<AddProduct />} />
        <Route path ="/Remove" element= {<h1>Set2</h1>} />
        <Route path ="/Update/:id" element= {<UpdateProduct/>} />
        <Route path ="/Success" element= {<h1>Action was successful!</h1>} />
        
        <Route path ="/WelcomeBack" element= {<Welcome/>} />
        </Route>
        <Route path ="/Login" element= {<Login />}/>
        <Route path ="/SignUp" element= {<SignUp />}/>
      </Routes>
      </BrowserRouter>
    </div>
    </body>
  );
}

export default App;
