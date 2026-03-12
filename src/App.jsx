import { BrowserRouter, Route, Routes } from "react-router"
import NavBar from "./NavBar"
import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"
import ConnectionRequest from "./ConnectionRequest"
import Request from "./Request"
import Premium from "./Premium"
function App() {
 

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
     
       <Route path="/login" element={<Login/>}/>
            <Route path="/Feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
         <Route path="/connections" element={<ConnectionRequest/>}/>
           <Route path="/requests" element={<Request/>}/>
           <Route path="/premium" element={<Premium/>}/>
        </Route>
    </Routes>
    </BrowserRouter>

     </Provider>

    
    </>
  )
}

export default App
