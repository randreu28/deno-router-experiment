import type { Route, RouteHandler, RouteContext, Middleware } from "./types.ts";

/**
 * A very simplistic HTTPS router built with Deno
 */
export class Router {
  private routes: Route[] = [];
  private middlewares: Middleware[] = [];

  /**
   * Adds a route to the router
   * @param method The HTTP method of the route
   * @param path The path of the route
   * @param handler The handler of the route
   * @example
   * router.addRoute("GET", "/home", (req, ctx) => new Response("Home Page"));
   */
  private addRoute(method: string, path: string, handler: RouteHandler) {
    const route: Route = {
      method,
      pattern: new URLPattern({ pathname: path }),
      handler,
    };
    this.routes.push(route);
  }

  /**
   * Adds a GET route to the router
   * @example
   * router.get("/home", (req, ctx) => new Response("Home Page"));
   */
  get(path: string, handler: RouteHandler) {
    this.addRoute("GET", path, handler);
  }

  /**
   * Adds a POST route to the router
   * @example
   * router.post("/submit", (req, ctx) => new Response("Form Submitted"));
   */
  post(path: string, handler: RouteHandler) {
    this.addRoute("POST", path, handler);
  }

  /**
   * Adds a PUT route to the router
   * @example
   * router.put("/update", (req, ctx) => new Response("Resource Updated"));
   */
  put(path: string, handler: RouteHandler) {
    this.addRoute("PUT", path, handler);
  }

  /**
   * Adds a PATCH route to the router
   * @example
   * router.patch("/modify", (req, ctx) => new Response("Resource Modified"));
   */
  patch(path: string, handler: RouteHandler) {
    this.addRoute("PATCH", path, handler);
  }

  /**
   * Adds a DELETE route to the router
   * @example
   * router.delete("/remove", (req: Request, ctx: RouteContext) => new Response("Resource Deleted"));
   */
  delete(path: string, handler: RouteHandler) {
    this.addRoute("DELETE", path, handler);
  }

  /**
   * Adds a middleware to the router. This will be executed before any routes. Usefull for global logic
   * @example
   * router.use(async (req) => {
   *   console.log(`Method: ${req.method} - Route: ${req.url}`);
   * });
   */
  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Serves the router to the http/s server
   * @example
   * const router = new Router();
   *
   * router.get("/books/:id", (_req: Request, ctx: RouteContext) => {
   *   const bookId = ctx.urlPattern.pathname.groups.id;
   *   return new Response(`this is book ${bookId}`);
   * });
   *
   * Deno.serve({
   *  port: 3000,
   *  handler: router.serve,
   * });
   */
  async serve(req: Request) {
    for (const middleware of this.middlewares) {
      const response = await middleware(req);
      if (response) return response;
    }

    for (const route of this.routes) {
      const match = route.pattern.exec(req.url);

      if (req.method === route.method && match) {
        const ctx: RouteContext = { urlPattern: match };
        return route.handler(req, ctx);
      }
    }

    return new Response("Not Found", { status: 404 });
  }
}
