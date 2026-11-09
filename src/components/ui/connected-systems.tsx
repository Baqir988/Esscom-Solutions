import { ArrowRight, ListOrdered, Monitor, Ticket } from "lucide-react";

export function ConnectedSystems() {
  return (
    <figure className="connected-systems">
      <div className="diagram-heading">
        <span className="micro-label">QUEUE MANAGEMENT CONCEPT</span>
        <ListOrdered size={20} aria-hidden="true" />
      </div>
      <div className="system-node">
        <Ticket aria-hidden="true" />
        <div><strong>Ticket</strong><span>A place in the service sequence</span></div>
      </div>
      <div className="system-node">
        <Monitor aria-hidden="true" />
        <div><strong>Queue display</strong><span>Information for the waiting area</span></div>
      </div>
      <div className="diagram-result">
        Visitor to service counter <ArrowRight size={18} aria-hidden="true" />
      </div>
      <figcaption>
        Concept illustration · not a real ESSCOM installation or product model.
      </figcaption>
    </figure>
  );
}
