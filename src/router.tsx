import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { NotFound } from "@/components/chrome/NotFound";
import { routeTree } from "./routeTree.gen";

/**
 * BOTH fallbacks must stay wired.
 *
 * `defaultNotFoundComponent` was missing, so every mistyped URL on
 * tumblenut.com rendered the router's bare "Not Found" text with the footer
 * collapsed into the header. `defaultErrorComponent` was pointed at the
 * scaffold's zinc-and-warning-triangle page that printed the raw exception.
 * Both now render the branded notice.
 */
export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
