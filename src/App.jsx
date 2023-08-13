import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Clients from './Clients/clients'; // Update the import statement for Clients
import Services from './Services/services'; // Update the import statement for Services

import XogtaShirkada from './XogtaShirkada/XogtaShirkada';
import Home from './Home/Home';
import About from './About/About';
import ImagesFolder from './Home/ImagesFolder';
import Contact from './Contact/Contact';
import Login from './Login/login';
import NotFound from './NotFound/notFound';
import { useUserContext } from './ContextApi/UserContext';
import LogOut from './Login/logout';

function App() {
  const { isLogin } = useUserContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<NotFound />} />

        {isLogin && (
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="Home" element={<Home />} />
            <Route path="images/:id/:Type" element={<ImagesFolder />} />
            <Route path="Services" element={<Services />} />
            <Route path="Clients" element={<Clients />} />
            <Route path="About" element={<About />} />
            <Route path="XogtaShirkada" element={<XogtaShirkada />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
