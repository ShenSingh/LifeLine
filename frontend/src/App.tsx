import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AdminProfile from "./pages/AdminPage/AdminProfile.tsx";

import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AdminHome from "./pages/AdminPage/Home";
import UserHome from "./pages/UserPage/Home";

import {AboutUs} from "./pages/UserPage/AboutUs.tsx";
import {Donor} from "./pages/UserPage/Donor.tsx";
import {FindDonor} from "./pages/UserPage/FindDonor.tsx";
import UserProfile from "./pages/UserPage/UserProfile.tsx";
import Test01 from "./test/Test01.tsx";
import Calendar from "./pages/Calendar.tsx";
import BloodRequest from "./pages/UserPage/userDashboard/BloodRequest.tsx";
import BloodDonation from "./pages/UserPage/userDashboard/BloodDonation.tsx";
import RequestDetails from "./pages/UserPage/userDashboard/RequestDetails.tsx";
import {AdminBloodRequest} from "./pages/UserPage/adminDashboard/AdminBloodRequest.tsx";
import {AdminBloodDonotion} from "./pages/UserPage/adminDashboard/AdminBloodDonotion.tsx";
import {AdminUserDonors} from "./pages/UserPage/adminDashboard/AdminUser-donors.tsx";
import {AdminUserRequesters} from "./pages/UserPage/adminDashboard/AdminUser-requesters.tsx";
import MapWithDirections from "./components/map/MapWithDirections.tsx";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route element={<AppLayout role={"admin"}/>}>
            <Route path="/admin" element={<AdminHome />} />
            {/* Admin Dashboard Layout */}
            <Route path="/admin-bloodRequest" element={<AdminBloodRequest />} />
            <Route path="/admin-bloodDonation" element={<AdminBloodDonotion />} />
            <Route path="/admin-donors" element={<AdminUserDonors />} />
            <Route path="/admin-requesters" element={<AdminUserRequesters />} />


          </Route>

          {/* AdminPage Layout */}
          <Route>
            <Route index path="/" element={<UserHome />} />

            {/* Others Page */}
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/*User pages*/}
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/findDonor" element={<FindDonor />} />
            <Route path="/donor" element={<Donor />} />
            <Route path="/test01" element={<Test01 />} />

            {/* UserPage Layout */}
          <Route path="/calendar" element={<Calendar />} />

          <Route element={<AppLayout role={"user"}/>}>
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/bloodRequest" element={<BloodRequest />} />
            <Route path="/bloodDonation" element={<BloodDonation />} />
            <Route path="/requestDetails" element={<RequestDetails />} />
            <Route path="/mapComponent" element={<MapWithDirections />} />
          </Route>



          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
