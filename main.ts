import { Router } from "./router.ts";
import type { RouteContext } from "./types.ts";

const router = new Router();

router.get("/books/:id", (_req: Request, ctx: RouteContext) => {
  const bookId = ctx.urlPattern.pathname.groups.id;
  return new Response(`this is book ${bookId}`);
});

Deno.serve({
  port: 3000,
  handler: router.serve,
});
