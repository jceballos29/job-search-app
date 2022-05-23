import "./assets/styles/app.scss";
import { Suspense, useCallback, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "./pages/Loading";
import AppRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { authContext } from "./context/AuthContext";
import auth from "./api/auth";
import jobs from "./api/jobs";

const App = () => {
  const context = useContext(authContext);

  const token = localStorage.getItem("jobSearchToken");

  const validate = useCallback(async () => {
      const result = await auth.validate();
      if (result.status === 200) {
        context.setAuth({
          isAuthenticated: true,
          user: result.data.user,
          loading: false,
          offers: null,
          applications: null,
        });
      }
    
  }, [context]);

  const fetchApplications = useCallback(async () => {
    const result = await jobs.fetchApplications();
    if (result.status === 200) {
      if (result.data.error) {
        context.setAuth({
          ...context.auth,
          applications: [],
        });
      } else {
        context.setAuth({
          ...context.auth,
          applications: result.data,
        });
      }
    }
  }, [context]);

  const fetchOffers = useCallback(async () => {
    const result = await jobs.fetchOffers();
    if (result.status === 200) {
      if (result.data.error) {
        context.setAuth({
          ...context.auth,
          offers: [],
        });
      } else {
        context.setAuth({
          ...context.auth,
          offers: result.data,
        });
      }
    }
  }, [context]);

  useEffect(() => {
    if (token && !context.auth.isAuthenticated) {
      validate();
    }
  }, [token, context, validate]);

  useEffect(() => {
    if (context.auth.isAuthenticated) {
      
      if (context.auth.user.role === "applicant") {
        fetchApplications();
      }
      if (context.auth.user.role === "employer") {
        fetchOffers();
      }
    }
  }, [context, fetchApplications, fetchOffers]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        style={{
          zIndex: 99999,
        }}
      />
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
