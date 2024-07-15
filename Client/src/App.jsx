import React, { Fragment, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import ChpEntry from "./Pages/ChpEntry";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./actions/userAction";
import "./index.css";
import Profile from "./Pages/Profile";
import { setIsLoginFalse } from "./slices/userSlice";
import Data from "./Pages/Data/Data";
import WashedData from "./Pages/Data/WashedData";
import ImportedData from "./Pages/Data/ImportedData";
import UnloadingEnd from "./Pages/ThirdPartyTps/UnloadingEnd";
import UnloadingRefree from "./Pages/ThirdPartyTps/UnloadingRefree";
import UnloadingThird from "./Pages/ThirdPartyTps/UnloadingThird";
import LoadingThird from "./Pages/ThirdPartyTps/LoadingThird";
import LoadingRefree from "./Pages/ThirdPartyTps/LoadingRefree";
import Loader from "./Components/Loader";
import SeeUnloadingEnd from "./Pages/SeeThirdPartyTPS/SeeUnloadingEnd";
import Proforma06 from "./Pages/Proforma06";

const App = React.memo(() => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(isLogin()).finally(() => setLoading(false));
    } else {
      dispatch(setIsLoginFalse());
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Navbar location={location} />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/chp-entry" /> : <Login />}
        />
        <Route
          path="/chp-entry"
          element={isAuthenticated ? <ChpEntry /> : <Navigate to="/" />}
        />
        {isAuthenticated && <Route path="/profile" element={<Profile />} />}
        <Route
          path="/data/raw-coal"
          element={isAuthenticated ? <Data /> : <Navigate to="/" />}
        />

        <Route
          path="/data/Washed-coal"
          element={isAuthenticated ? <WashedData /> : <Navigate to="/" />}
        />

        <Route
          path="/data/imported-coal"
          element={isAuthenticated ? <ImportedData /> : <Navigate to="/" />}
        />

        {/* lab entry routes */}

        <Route
          path="/lab-entry/unloading-end-tps"
          element={isAuthenticated ? <UnloadingEnd /> : <Navigate to="/" />}
        />

        <Route
          path="/lab-entry/unloading-end-tpsa-iia"
          element={isAuthenticated ? <UnloadingRefree /> : <Navigate to="/" />}
        />

        <Route
          path="/lab-entry/loading-end-tpsa-iia"
          element={isAuthenticated ? <UnloadingThird /> : <Navigate to="/" />}
        />

        <Route
          path="/lab-entry/unloading-end-tps-referee"
          element={isAuthenticated ? <LoadingThird /> : <Navigate to="/" />}
        />

        <Route
          path="/lab-entry/loading-end-tps-referee"
          element={isAuthenticated ? <LoadingRefree /> : <Navigate to="/" />}
        />

        {/* data */}

        <Route
          path="/lab-entry/unloading-end-tps-data"
          element={isAuthenticated ? <SeeUnloadingEnd /> : <Navigate to="/" />}
        />

        {/* proforma 06 */}

        <Route
          path="report/proforma06"
          element={isAuthenticated ? <Proforma06 /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster position="top-left" reverseOrder={false} />
    </Fragment>
  );
});

App.displayName = "App";

export default App;
