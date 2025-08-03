import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import DoctorProfile from "./components/DoctorsProfile";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
