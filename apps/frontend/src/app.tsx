// import * as React from 'react';
// import ReactDOM from 'react-dom'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// // import HomePage from './components/HomePage';
// import Root from './components/Root';
// import ErrorPage from './components/ErrorPage';

// import './app.css';

// const router = createBrowserRouter([
//   { path: '/', element: <Root />, errorElement: <ErrorPage />},
//   // { path: '/home', element: <HomePage /> },
//   { path: '/login', element: <Login /> },
//   { path: '/signup', element: <SignUp /> },
// ]);

// const rootElement = document.getElementById("root");
// if (rootElement) {
//     const root = ReactDOM.createRoot(rootElement);
//     root.render(
//       <React.StrictMode>
//         <RouterProvider router={router} />
//       </React.StrictMode>
//     );
// } */

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <RouterProvider router={router} />
// //   </React.StrictMode>
// // );

// function App() {

//   return (
//     <>

//     </>
//   );
// }

// export default App;




// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import SignUp from './components/SignUp';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
// import React from 'react';

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
  // const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
  
    </>
  );
}

export default App;
