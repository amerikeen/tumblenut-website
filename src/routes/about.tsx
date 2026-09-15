import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

export const Route = createFileRoute("/about")({ component: Page });

function Page() {
  return (
    <PagePlaceholder
      eyebrow="About"
      heading="The workshop"
      body="Doc, Cecil, and why there is more than one jar on the wall. This page is not written yet — the story has to be exactly right before it goes up, so it is coming rather than guessed at."
    />
  );
}
