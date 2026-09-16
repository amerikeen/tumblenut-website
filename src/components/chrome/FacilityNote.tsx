import { FACILITY_NOTE, LABEL_NOTE } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * The allergen disclosure with the label promise stacked under it.
 *
 * Two lines, always, on every page that shows them. They used to be one
 * concatenated string, which read as a run-on and buried the disclosure in the
 * middle of a sentence about labels. The `<br />` is deliberate rather than
 * letting them wrap naturally: where the line falls should not depend on the
 * width of whatever panel they happen to sit in.
 *
 * `FACILITY_NOTE` is the disclosure and may not be reworded. Everything else
 * about how this renders is presentation.
 */
export function FacilityNote({ className }: { className?: string }) {
  return (
    <p className={cn("t-body", className)}>
      {FACILITY_NOTE}
      <br />
      {LABEL_NOTE}
    </p>
  );
}
