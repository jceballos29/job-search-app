import "./assets/styles/app.scss";
import { Suspense, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "./pages/Loading";
import AppRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { authContext } from "./context/AuthContext";
import auth from "./api/auth";

const App = () => {
  const context = useContext(authContext);

  const token = localStorage.getItem("jobSearchToken");

  useEffect(() => {
    const validate = async () => {
      if (token) {
        const result = await auth.validate();
        if (result.status === 200) {
          context.setAuth({
            isAuthenticated: true,
            user: result.data.user,
            loading: false,
          });
        }
      }
    };
    if (!context.auth.isAuthenticated) {
      validate();
    }
  }, [context, token]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
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
