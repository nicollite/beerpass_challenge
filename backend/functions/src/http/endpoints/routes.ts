import { Router } from "express";
import { authRoute } from "./controllers/auth";
import { choppRouter } from "./controllers/chopp";

export interface Route {
  router: Router;
  path: string;
  children?: Route[];
}

const routes: Route[] = [
  {
    router: choppRouter,
    path: "chopp",
  },
  {
    router: authRoute,
    path: "auth",
  },
];

/**
 * Recursevly set the children routes
 * @param route Route object
 */
function setRoutes(route: Route): void {
  if (route.children)
    route.children.forEach(childRoute => {
      route.router.use(`/${childRoute.path}`, childRoute.router);
      if (childRoute.children) setRoutes(childRoute);
    });
}

/** Get the router for express */
export function getRoutes(): Router {
  const allRoutes = Router();
  routes.forEach(route => setRoutes(route));
  routes.forEach(route => allRoutes.use(`/${route.path}`, route.router));
  return allRoutes;
}
