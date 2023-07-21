import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import Navbar from './layouts/Navbar'
import Footer from "./layouts/Footer"
import User from "./components/users/User"
import { GithubProvider } from "./context/github/GIthubContext"
import { AlertContextProvider } from "./context/alert/AlertContext"
import Alert from "./components/Alert"
 function App() {
  return (
    <GithubProvider>
   <AlertContextProvider>
   <Router>
     <div className="flex flex-col justify-between h-screen text-white">
      <Navbar/>
      <Alert/>
      <main className="container mx-auto px-3 pb-12">
        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/about"  element={<About/>}/>
          <Route path="/user/:login" element={<User/>}/>
          <Route path="/notfound"  element={<NotFound/>}/>
          <Route path="/*"  element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer/>
     </div>
    </Router>
   </AlertContextProvider>
    </GithubProvider>

  )
}

export default App