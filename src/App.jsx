import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import NavBar from './components/NavBar'

function App() {  

  return (
    <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/posts/:postId' element={<PostPage />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>    
  )
}

export default App
