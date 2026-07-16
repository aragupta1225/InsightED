import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Auth/Login';
import CreatePassword from './pages/Auth/CreatePassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Classes from './pages/Classes/Classes';
import ClassDetails from './pages/Classes/ClassDetails';
import Performance from './pages/Performance/Performance';
import Attendance from './pages/Attendance/Attendance';
import Settings from './pages/Settings/Settings';
import StudentProfile from './pages/Students/StudentProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetails />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/student/:id" element={<StudentProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
