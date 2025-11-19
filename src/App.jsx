import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user] = useState({ name: "کاربر" });

  return (
    <div className="container mx-auto max-w-[1400px] min-h-screen">
      <Dashboard user={user} />
      <ToastContainer ltr />
    </div>
  );
}

export default App;
