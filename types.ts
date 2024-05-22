export type RouteContext = {
  urlPattern: URLPatternResult;
};

export type RouteHandler = (
  req: Request,
  ctx: RouteContext
) => Response | Promise<Response>;

export type Middleware = (req: Request) => Response | Promise<Response> | null;

export type Route = {
  method: string;
  pattern: URLPattern;
  handler: RouteHandler;
};
