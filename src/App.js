import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signin";
import OpenRoute from "./component/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./component/core/Dashboard/MyProfile";
import DashBoard from "./pages/DashBoard";
import PrivateRoute from "./component/core/Auth/PrivateRoute";
import Settings from "./component/core/Dashboard/Setting/Settings";
import EnrolledCourses from "./component/core/Dashboard/EnrolledCourses";
import Cart from "./component/core/Dashboard/Cart/index";
import { useSelector } from "react-redux";
import AddCourse from "./component/core/Dashboard/AddCourse/index";
import MyCourse from "./component/core/Dashboard/MyCourse";
import EditCours from "./component/core/Dashboard/EditCourse/EditCourses";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./component/core/ViewCourse/VideoDetails";
import Contact from "./pages/Contact";
import Instructor from "./component/core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const { user}=useSelector((state)=>state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='catalog/:catalogName' element={<Catalog/>} />
        <Route path='courses/:courseId' element={<CourseDetails/>} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route 
          element={
            <PrivateRoute>
              <DashBoard/>
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings/>} />
          <Route path="dashboard/instructor" element={<Instructor/>} />
          <Route path="dashboard/cart" element={<Cart/>} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="dashboard/add-course" element={<AddCourse/>}/>
          <Route path="dashboard/my-courses" element={<MyCourse/>}/>
          <Route path="dashboard/edit-course/:courseId" element={<EditCours/>}/>
        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;