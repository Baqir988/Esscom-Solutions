import { publishedClients } from "./clients";
import { publishedPartners } from "./partners";
// Shared homepage projection; records remain centralized by relationship type.
export const organizations = [...publishedClients, ...publishedPartners];
