export type PortfolioEventName =
  | "project_link_click"
  | "project_demo_play"
  | "resume_click"
  | "nav_click";

export function trackPortfolioEvent(
  eventName: PortfolioEventName,
  properties: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("portfolio-event", {
      detail: {
        eventName,
        properties,
      },
    }),
  );
}
