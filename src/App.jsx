import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import UnpublishedPosts from './pages/UnpublishedPosts'

function App() {  

  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/admin/' element={
              <ProtectedRoute element={<HomePage />}/>
              }/>
            <Route path='/admin/unpublished' element={
              <ProtectedRoute element={<UnpublishedPosts/>}/>
            }/>
            <Route path='/admin/posts/:postId' element={
              <ProtectedRoute element={<PostPage />} />
              }/>
            <Route path='/' element={<LoginPage />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>    
  )
}

export default App
