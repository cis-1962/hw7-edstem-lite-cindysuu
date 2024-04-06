import SignUp from './components/SignUp';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import './app.css';

const router = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <ErrorPage />},
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
]);

// const rootElement = document.getElementById("root");
// if (rootElement) {
//     const root = ReactDOM.createRoot(rootElement);
//     root.render(
//       <React.StrictMode>
//         <RouterProvider router={router} />
//       </React.StrictMode>
//     );
// }

function App() {

  return (
    <>
      <RouterProvider router={router} />
  
    </>
  );
}

export default App;
