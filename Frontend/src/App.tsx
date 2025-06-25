import Navbar from "./Components/Navbar";
import AllPatent from "./Components/AllPatent";
import CreatePatent from "./Components/CreatePatent";
import MyPatents from "./Components/MyPatents";
import PatentDetails from "./Components/patentDetails";
import { Routes, Route } from "react-router"
import { Toaster } from "react-hot-toast";

const App = () => {

  return (
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
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </div>
  );
};

export default App;