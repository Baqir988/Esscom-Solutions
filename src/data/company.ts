import type { ContentPoint } from "@/types/solution";

export const companyIntroduction = [
  "The supplied Techno World International profile identifies ESSCom Solutions as one of several separate divisions. It also lists ESSCom Engineering, Techno Solar, and Technovation; the profile does not establish that all group offerings belong to ESSCOM.",
  "The profile specifically names an ESS-Queue Management System and shows a queue display marked “Powered by ESSCOM Solutions.” This is the clearest ESSCOM-specific solution evidence found in the source. Other product categories and corporate details require confirmation before publication.",
];
export const capabilityHighlights = [
  "ESS-Queue Management System reference",
  "Ticket and counter display concepts",
  "Customer-flow applications described in the profile",
];
export const positioningThemes: ContentPoint[] = [
  { title: "Clarify the service flow", description: "Map how visitors arrive, receive a ticket, wait, and reach a service counter." },
  { title: "Consider display placement", description: "Review how ticket and counter information can be seen in the waiting area." },
  { title: "Confirm the system scope", description: "Verify equipment, current availability, operating requirements, and responsibilities before describing a specific configuration." },
  { title: "Keep evidence attached", description: "Separate ESSCOM-specific references from historical material belonging to other divisions." },
  { title: "Treat applications as possibilities", description: "Use the profile’s referenced service environments as examples, not as a list of ESSCOM clients." },
];
export const approachSteps: ContentPoint[] = [
  { title: "Understand the service", description: "Identify how people enter the service area and what information helps them find the next step." },
  { title: "Review counters and waiting space", description: "Consider ticket collection, queue displays, counter positions, and visitor circulation." },
  { title: "Confirm components", description: "Verify the current equipment and how ticketing and displays operate together." },
  { title: "Agree the scope", description: "Document the selected system, responsibilities, and operating requirements before implementation." },
];
// Proposed wording only; not an approved ESSCOM mission or vision.
export const proposedDirection = {
  mission: "Support organizations in considering queue-management technology around their service arrangements.",
  vision: "Make customer-flow information clear and useful in service environments.",
};
