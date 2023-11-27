import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root';
import FlagGame from '../pages/FlagGame';
import CapitalGame from '../pages/CapitalGame';
import Wiki from '../pages/Wiki';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound'
import dataLoader from './dataLoader';



const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      loader: dataLoader,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
            path: "/flag-guessing-game",
            element: <FlagGame />
          },
          {
            path: "/capital-guessing-game",
            element: <CapitalGame />
          },
          {
            path: "learn-about-countries",
            element: <Wiki />
          }
      ]
    },
    
  ]);

  
  
  export default router;