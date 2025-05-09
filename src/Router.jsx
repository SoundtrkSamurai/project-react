import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFoundPage from '@/components/NotFoundPage';
import Route from '@/components/Route';
import CreateListingPage from '@/pages/CreateListingPage';
import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import ProfilePage from '@/pages/ProfilePage';
import SignInPage from '@/pages/SignInPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: (
          <Route isProtected={true}>
            <HomePage />
          </Route>
        ),
      },
      {
        path: '/favorites',
        element: (
          <Route isProtected={true}>
            <ListingFavoritesPage />
          </Route>
        ),
      },
      {
        path: '/listings/create',
        element: <CreateListingPage />
      },
      {
        path: '/listings/:listingId',
        element: (
          <Route isProtected={true}>
            <ListingDetailsPage />
          </Route>
        ),
      },
      {
        path: '/profile',
        element: (
          <Route isProtected={true}>
            <ProfilePage />
          </Route>
        ),
      },
      {
        path: '/signin',
        element: (
          <Route>
            <SignInPage />
          </Route>
        ),
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
