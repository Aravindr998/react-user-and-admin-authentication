import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import { Provider, useSelector } from 'react-redux'
import store from './store/store'
import ProtectedRoutes from './utils/ProtectedRoutes'
import PublicRoutes from './utils/PublicRoutes'
import AdminLogin from './pages/AdminLogin'
import AdminHomePage from './pages/AdminHomePage'
import AdminProtectedRoutes from './utils/AdminProtectedRoutes'
import AdminPublicRoutes from './utils/AdminPublicRoutes'
import AdminEditPage from './pages/AdminEditPage'


function App() {
  return (
    <Provider store={store}>
        <Router>
          <Routes>
              <Route element={ <PublicRoutes/> }>
                <Route path='/register' element={ <SignupPage/> }/>
                <Route path='/login' element={ <LoginPage/> }/>
              </Route>
              <Route element={ <ProtectedRoutes/> }>
                <Route path='/' element={ <HomePage/> }/>
                <Route path='/profile' element={ <ProfilePage/> }/>
              </Route>
              <Route element={ <AdminProtectedRoutes/> } >
                <Route path='/admin' element={ <AdminHomePage/> }/>
                <Route path='/admin/edit/:id' element={ <AdminEditPage/> }/>
              </Route>
              <Route element={ <AdminPublicRoutes/> }>
                <Route path='/admin/login' element={ <AdminLogin/> }/>
              </Route>
          </Routes>
        </Router>
    </Provider>
  )
}

export default App
