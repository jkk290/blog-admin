import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './pages/Signup'
import NavBar from './components/NavBar'

function App() {  

  return (
    <AuthProvider>
        <BrowserRouter>
          {/* <NavBar /> */}
          <Routes>
            <Route path='/admin/' element={
              <ProtectedRoute element={<HomePage />}/>
              }/>
            <Route path='/admin/posts/:postId' element={
              <ProtectedRoute element={<PostPage />} />
              }/>
            <Route path='/' element={<LoginPage />}/>
            {/* <Route path='/signup' element={<Signup />}/> */}
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>    
  )
}

export default App
