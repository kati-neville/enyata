import { ROUTES } from "./routes";
import { AppWrapper } from "@/app";
import { ListView } from "@/pages/list-view";
import { HomeView } from "@/pages/home-view";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "@/components/error";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <AppWrapper>
        <HomeView />
      </AppWrapper>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.LIST,
    element: (
      <AppWrapper>
        <ListView />
      </AppWrapper>
    ),
    errorElement: <ErrorPage />,
  },
]);
