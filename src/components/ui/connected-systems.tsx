import { ArrowRight, Layers3 } from "lucide-react";
import { SolutionIcon } from "./solution-icon";
export function ConnectedSystems() {
  return (
    <figure className="connected-systems">
      <div className="diagram-heading">
        <span className="micro-label">A CONNECTED VIEW</span>
        <Layers3 size={20} aria-hidden="true" />
      </div>
      <div className="system-node">
        <SolutionIcon name="camera" />
        <div>
          <strong>Spaces</strong>
          <span>Visibility & controlled entry</span>
        </div>
      </div>
      <div className="system-node">
        <SolutionIcon name="fingerprint" />
        <div>
          <strong>People</strong>
          <span>Attendance & service journeys</span>
        </div>
      </div>
      <div className="system-node">
        <SolutionIcon name="display" />
        <div>
          <strong>Operations</strong>
          <span>Transactions & communication</span>
        </div>
      </div>
      <div className="diagram-result">
        One considered environment <ArrowRight size={18} aria-hidden="true" />
      </div>
      <figcaption>
        Conceptual relationship between technology categories.
      </figcaption>
    </figure>
  );
}
