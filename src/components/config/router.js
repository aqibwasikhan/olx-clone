import { BrowserRouter as Router, 
Route,Routes } from "react-router-dom"
import Register from "../Register/Register"
import Dashboard from "../Dashboard/Dashboard"
import Postadd from "../Postadd/Postadd"
import Details from "../Details/Details"
const App = (props) => {
  console.log('router ki uid' ,props.useruid)
  return (
    <Router>
        <Routes>
            <Route path="/" element={props.useruid ? <Dashboard/> : <Register/>}/>
            <Route path="/dashboard" element={props.useruid ? <Dashboard/> : <Register/>}/>  
            <Route path="/postadd" element={props.useruid ? <Postadd/> : <Register/>}/>  
            <Route path="/details/:addId" element={props.useruid ? <Details/> : <Register/>}/>  


        </Routes>
    </Router>
    
  )
}

export default App