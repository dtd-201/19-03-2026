import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashbord from "./pages/Dashbord";
import FormLogin from "./pages/FormLogin";
import MainLayout from "./layouts/MainLayout";
import StudenMangerment from "./pages/StudentManagerment";
import TeacherManagerment from "./pages/TeacherManagerment";
import "./App.css";
import SubjectManagerment from "./pages/SubjectManagerment";
import AccountInfo from "./pages/AccountInfo";
import ChapterManagement from "./pages/ChapterManagerment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="dashbord" element={<Dashbord />} />
          <Route path="students" element={<StudenMangerment />} />
          <Route path="teacher" element={<TeacherManagerment />}></Route>
          <Route path="subjects">
            <Route path="listsubjects" element={<SubjectManagerment />} />
            <Route path="chapter" element={<ChapterManagement />} />
          </Route>
          <Route path="/profile" element={<AccountInfo />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
