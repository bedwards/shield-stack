import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  deadlines: {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
  }[];
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
          deadlines: [],
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
