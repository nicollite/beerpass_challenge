import { RequestHandler, Router } from "express";
import { authRoute } from "./controllers/auth";
import { choppRouter } from "./controllers/chopp";
import { authentication } from "./middleware/auth";

export interface Route {
  router: Router;
  path: string;
  middlaware?: RequestHandler[];
  children?: Route[];
}

const routes: Route[] = [
  {
    router: choppRouter,
    path: "chopp",
    middlaware: [authentication],
  },
  {
    router: authRoute,
    path: "auth",
  },
];

/**
 * Recursevly set the children routes and middlawares
 * @param route Route object
 */
function setRoutes(route: Route): void {
  if (route.children)
    route.children.forEach(childRoute => {
      const middlaware = route.middlaware ? route.middlaware : [];
      route.router.use(`/${childRoute.path}`, ...middlaware, childRoute.router);
      if (childRoute.children) setRoutes(childRoute);
    });
}

/** Get the router for express */
export function getRoutes(): Router {
  const allRoutes = Router();

  routes.forEach(route => setRoutes(route));
  routes.forEach(route => {
    const middlaware = route.middlaware ? route.middlaware : [];
    allRoutes.use(`/${route.path}`, ...middlaware, route.router);
  });
  return allRoutes;
}
