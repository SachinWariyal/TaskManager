import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import NavigationBar from './components/Navbar';
import PrivateRoute from './components/privateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

const App = () => (
  <Router>
    <AuthProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<PrivateRoute />}>
          <Route index element={<TaskList />} />
          <Route path="new" element={<TaskForm />} />
          <Route path="edit/:id" element={<TaskForm />} />
        </Route>
        <Route path="*" element={<div className="text-center p-5">404 - Page Not Found</div>} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
