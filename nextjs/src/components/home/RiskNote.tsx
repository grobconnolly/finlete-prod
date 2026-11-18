import { riskLine } from "@/data/home-content";
import { InfoIcon } from "./icons";

export function RiskNote({ children = riskLine }: { children?: string }) {
  return (
    <p className="risk" role="note">
      <InfoIcon />
      <span>{children}</span>
    </p>
  );
}
