import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

export const Route = createFileRoute("/contact")({ component: Page });

function Page() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      heading="Get in touch"
      body="A proper contact form is coming. In the meantime, wholesale enquiries have their own page, and anything else can wait for the form rather than going to an address nobody is watching."
    />
  );
}
