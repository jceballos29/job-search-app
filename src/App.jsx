import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Loading from './pages/Loading';
import AppRoutes from './routes/routes';
 
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
