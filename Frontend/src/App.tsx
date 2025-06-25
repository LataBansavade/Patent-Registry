import Navbar from "./Components/Navbar";
import AllPatent from "./Components/AllPatent";
import CreatePatent from "./Components/CreatePatent";
import MyPatents from "./Components/MyPatents";
import PatentDetails from "./Components/patentDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <Router>
    <div className="h-screen bg-black">
     
      <Navbar />
      <Routes>
        <Route path="/" element={<AllPatent />} />
        <Route path="/create" element={<CreatePatent />} />
        <Route path="/my-patents" element={<MyPatents />} />
        <Route path="/patentDetails" element={<PatentDetails />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
      </div>
      </Router>
  );
};

export default App;