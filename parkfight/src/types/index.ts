/**
 * Shared type definitions for ParkFight.
 */
export type TicketStatus = "new" | "analyzing" | "dispute_ready" | "submitted" | "won" | "lost";
export type ViolationType = "expired_meter" | "no_parking" | "street_cleaning" | "fire_hydrant" | "double_parking" | "permit" | "other";

export interface ParkingTicket {
  id: string;
  userId: string;
  city: string;
  state: string;
  violationType: ViolationType;
  ticketNumber: string;
  fineAmount: number;
  issuedAt: string;
  location: string;
  status: TicketStatus;
  createdAt: string;
}

export interface DisputeLetter {
  id: string;
  ticketId: string;
  content: string;
  defenseStrategy: string;
  evidenceSuggestions: string[];
  createdAt: string;
}

export interface CityRules {
  id: string;
  city: string;
  state: string;
  disputeDeadlineDays: number;
  disputeUrl: string | null;
  disputeProcess: string;
  successRate: number | null;
}
