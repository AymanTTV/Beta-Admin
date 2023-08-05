import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard/Dashboard';
import Clients from './clients/clients'; // Update the import statement for Clients
import Services from './Services/services'; // Update the import statement for Services

import XogtaShirkada from './XogtaShirkada/XogtaShirkada';
import Home from './Home/Home';
import About from './About/About';
import ImagesFolder from './Home/ImagesFolder'
import Contact from './Contact/Contact'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        <Route path="Home" element={<Home />} />
        <Route path="images/:id/:Type" element={<ImagesFolder />} />
        <Route path="Services" element={<Services />} />
        <Route path="Clients" element={<Clients />} />
        <Route path="About" element={<About />} />
        <Route path="XogtaShirkada" element={<XogtaShirkada />} />
        <Route path="contact" element={< Contact/>} />

        </Route>
      </Routes>
    </>
  );
}

export default App;