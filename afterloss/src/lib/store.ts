import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Deadline } from "@/types";
import { computeDeadlines } from "@/lib/deadlines";

export type Relationship = "spouse" | "child" | "sibling" | "parent" | "other";
export type EstateComplexity = "simple" | "moderate" | "complex";

export interface LocalEstateCase {
  id: string;
  state: string;
  relationship: Relationship;
  estateComplexity: EstateComplexity;
  dateOfDeath: string;
  deceasedName?: string;
  createdAt: string;
  checklistProgress: Record<
    string,
    {
      status: "pending" | "in_progress" | "completed" | "skipped";
      completedAt?: string;
      notes?: string;
    }
  >;
  generatedDocuments: {
    id: string;
    type: string;
    generatedAt: string;
    content: string;
  }[];
  deadlines: Deadline[];
}

interface OnboardingData {
  state: string;
  relationship: Relationship;
  estateComplexity: EstateComplexity;
  dateOfDeath: string;
  deceasedName?: string;
}

interface EstateStoreState {
  currentCase: LocalEstateCase | null;
  setOnboardingData: (data: OnboardingData) => void;
  toggleItem: (itemId: string) => void;
  skipItem: (itemId: string) => void;
  toggleDeadline: (deadlineId: string) => void;
  resetCase: () => void;
  getCase: () => LocalEstateCase | null;
}

export const useEstateStore = create<EstateStoreState>()(
  persist(
    (set, get) => ({
      currentCase: null,

      setOnboardingData: (data: OnboardingData) => {
        const newCase: LocalEstateCase = {
          id: crypto.randomUUID(),
          state: data.state,
          relationship: data.relationship,
          estateComplexity: data.estateComplexity,
          dateOfDeath: data.dateOfDeath,
          deceasedName: data.deceasedName,
          createdAt: new Date().toISOString(),
          checklistProgress: {},
          generatedDocuments: [],
          deadlines: computeDeadlines(data.state, data.dateOfDeath),
        };
        set({ currentCase: newCase });
      },

      toggleItem: (itemId: string) => {
        const currentCase = get().currentCase;
        if (!currentCase) return;

        const progress = { ...currentCase.checklistProgress };
        const current = progress[itemId];

        if (current?.status === "completed") {
          // Toggle back to pending
          delete progress[itemId];
        } else {
          // Mark completed
          progress[itemId] = {
            status: "completed",
            completedAt: new Date().toISOString(),
          };
        }

        set({
          currentCase: { ...currentCase, checklistProgress: progress },
        });
      },

      toggleDeadline: (deadlineId: string) => {
        const currentCase = get().currentCase;
        if (!currentCase) return;

        const deadlines = currentCase.deadlines.map((d) =>
          d.id === deadlineId ? { ...d, completed: !d.completed } : d,
        );

        set({
          currentCase: { ...currentCase, deadlines },
        });
      },

      skipItem: (itemId: string) => {
        const currentCase = get().currentCase;
        if (!currentCase) return;

        const progress = { ...currentCase.checklistProgress };
        const current = progress[itemId];

        if (current?.status === "skipped") {
          // Un-skip
          delete progress[itemId];
        } else {
          // Mark skipped
          progress[itemId] = {
            status: "skipped",
          };
        }

        set({
          currentCase: { ...currentCase, checklistProgress: progress },
        });
      },

      resetCase: () => {
        set({ currentCase: null });
      },

      getCase: () => {
        return get().currentCase;
      },
    }),
    {
      name: "afterloss-estate-case",
    },
  ),
);
