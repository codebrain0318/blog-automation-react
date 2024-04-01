import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Login from './content/pages/Auth/Login';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader message="" />}>
    <Component {...props} />
  </Suspense>
);

const Logging = Loader(
  lazy(() => import('src/content/applications/Logging'))
);
const Blogs = Loader(
  lazy(() => import('src/content/applications/Blogs'))
);
const Languages = Loader(
  lazy(() => import('src/content/applications/Languages'))
);
const Dictionaries = Loader(
  lazy(() => import('src/content/applications/Dictionaries'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/management/blogs" replace />
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <Login />
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: 'management',
        element: <SidebarLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="Blogs" replace />
          },
          {
            path: 'blogs',
            element: <Blogs />
          },
          {
            path: 'languages',
            element: <Languages />
          },
          {
            path: 'dictionaries',
            element: <Dictionaries />
          },
          {
            path: 'transactions',
            element: <Transactions />
          },
          {
            path: 'logging',
            element: <Logging />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
];

export default routes;
