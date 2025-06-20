import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Process from './Process';
import HomePage from './Home';
import Login from './Login';
import Signup from './Signup';
import DashboardPage from './Dashboard';
import toast, { Toaster } from 'react-hot-toast';
import PrivateRoute from './Private';
import ProfilePage from './Profile';
function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/process" element={<PrivateRoute />} >
            <Route path="/process" element={<Process />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute />} >
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} >
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;