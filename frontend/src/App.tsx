import Sidebar from './components/Sidebar/Sidebar';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectPage />,
  },
]);

const App = () => {
  return (
    <div className="h-[100vh] flex">
      {/* <Sidebar /> */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App