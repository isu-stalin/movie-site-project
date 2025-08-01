import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const MovieDetails = lazy(() => import("./movies/MovieDetails"));
const Saved = lazy(() => import("./saved/Saved"));
const Search = lazy(() => import("./search/Search"));
const Profile = lazy(() => import("./profile/Profile"));
const NotFound = lazy(() => import("./notFound/NotFound"));
// const ProtectedRoute = lazy(() => import("../components/protectRoute/ProtectedRoute"));
const ActorDetails = lazy(() => import("./actorDetails/ActorDetails"));

const MainRouter = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movies/:id",
          element: <MovieDetails />,
        },
        {
          path: "/saved",
          element: <Saved />
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/actors/:id",
          element: <ActorDetails />,
        },       
      ],
    },
  ]);
};

export default MainRouter;
