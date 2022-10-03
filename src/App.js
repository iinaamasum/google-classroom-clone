import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import ProfileInfo from './Pages/Auth/ProfileInfo';
import Register from './Pages/Auth/Register';
import RequireAuth from './Pages/Auth/RequireAuth';
import AddedClassWorkDetails from './Pages/ClassDashboard/AddedClassWorkDetails';
import ClassDetails from './Pages/ClassDashboard/ClassDetails';
import Classes from './Pages/Classes/Classes';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile-info"
          element={
            <RequireAuth>
              <ProfileInfo />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Classes />
            </RequireAuth>
          }
        />
        <Route
          path="/class-details/:id"
          element={
            <RequireAuth>
              <ClassDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/class-details/added-class-work-details/:workId"
          element={
            <RequireAuth>
              <AddedClassWorkDetails />
            </RequireAuth>
          }
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
