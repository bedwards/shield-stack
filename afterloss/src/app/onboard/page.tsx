"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useEstateStore,
  type Relationship,
  type EstateComplexity,
} from "@/lib/store";
import { US_STATES } from "@/lib/states";

const TOTAL_STEPS = 4;

const RELATIONSHIPS: { value: Relationship; label: string; description: string }[] = [
  { value: "spouse", label: "Spouse or Partner", description: "Husband, wife, or domestic partner" },
  { value: "child", label: "Son or Daughter", description: "Adult child of the deceased" },
  { value: "sibling", label: "Brother or Sister", description: "Sibling of the deceased" },
  { value: "parent", label: "Parent", description: "Mother or father of the deceased" },
  { value: "other", label: "Other Relationship", description: "Friend, extended family, or other" },
];

const COMPLEXITIES: { value: EstateComplexity; label: string; description: string }[] = [
  {
    value: "simple",
    label: "Simple",
    description:
      "Few assets, no real estate or business interests, no disputes among family members",
  },
  {
    value: "moderate",
    label: "Moderate",
    description:
      "Some assets like a home or retirement accounts, straightforward family situation",
  },
  {
    value: "complex",
    label: "Complex",
    description:
      "Multiple properties, business interests, significant assets, or potential family disputes",
  },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div data-testid="step-indicator" className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              data-testid={`step-dot-${step}`}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : isCompleted
                    ? "bg-primary-light text-primary"
                    : "bg-secondary text-muted"
              }`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            {step < TOTAL_STEPS && (
              <div
                className={`w-8 h-0.5 transition-colors ${
                  step < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StateStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 data-testid="step-title" className="text-2xl sm:text-3xl font-bold text-foreground">
          Where did your loved one live?
        </h2>
        <p className="text-muted text-base sm:text-lg">
          Estate laws vary by state. This helps us give you the right guidance.
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <label htmlFor="state-select" className="block text-sm font-medium text-foreground mb-2">
          State of residence
        </label>
        <select
          id="state-select"
          data-testid="state-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-card text-card-foreground px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        >
          <option value="">Select a state...</option>
          {US_STATES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function RelationshipStep({
  value,
  onChange,
}: {
  value: Relationship | "";
  onChange: (val: Relationship) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 data-testid="step-title" className="text-2xl sm:text-3xl font-bold text-foreground">
          What is your relationship?
        </h2>
        <p className="text-muted text-base sm:text-lg">
          This helps us tailor the checklist to your specific responsibilities.
        </p>
      </div>
      <div
        data-testid="relationship-select"
        className="max-w-md mx-auto space-y-3"
        role="radiogroup"
        aria-label="Relationship to deceased"
      >
        {RELATIONSHIPS.map((r) => (
          <label
            key={r.value}
            data-testid={`relationship-option-${r.value}`}
            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
              value === r.value
                ? "border-primary bg-primary-light"
                : "border-border bg-card hover:border-warm-gray"
            }`}
          >
            <input
              type="radio"
              name="relationship"
              data-testid={`relationship-radio-${r.value}`}
              value={r.value}
              checked={value === r.value}
              onChange={() => onChange(r.value)}
              className="mt-1 accent-primary"
            />
            <div>
              <span className="block font-medium text-foreground">{r.label}</span>
              <span className="block text-sm text-muted">{r.description}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function ComplexityStep({
  value,
  onChange,
}: {
  value: EstateComplexity | "";
  onChange: (val: EstateComplexity) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 data-testid="step-title" className="text-2xl sm:text-3xl font-bold text-foreground">
          How would you describe the estate?
        </h2>
        <p className="text-muted text-base sm:text-lg">
          Don&apos;t worry if you&apos;re not sure &mdash; you can change this later.
        </p>
      </div>
      <div
        data-testid="complexity-select"
        className="max-w-md mx-auto space-y-3"
        role="radiogroup"
        aria-label="Estate complexity"
      >
        {COMPLEXITIES.map((c) => (
          <label
            key={c.value}
            data-testid={`complexity-option-${c.value}`}
            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
              value === c.value
                ? "border-primary bg-primary-light"
                : "border-border bg-card hover:border-warm-gray"
            }`}
          >
            <input
              type="radio"
              name="complexity"
              data-testid={`complexity-radio-${c.value}`}
              value={c.value}
              checked={value === c.value}
              onChange={() => onChange(c.value)}
              className="mt-1 accent-primary"
            />
            <div>
              <span className="block font-medium text-foreground">{c.label}</span>
              <span className="block text-sm text-muted">{c.description}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function DateStep({
  dateValue,
  onDateChange,
  nameValue,
  onNameChange,
}: {
  dateValue: string;
  onDateChange: (val: string) => void;
  nameValue: string;
  onNameChange: (val: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 data-testid="step-title" className="text-2xl sm:text-3xl font-bold text-foreground">
          When did they pass away?
        </h2>
        <p className="text-muted text-base sm:text-lg">
          This helps us calculate important deadlines for you.
        </p>
      </div>
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="date-of-death" className="block text-sm font-medium text-foreground mb-2">
            Date of passing
          </label>
          <input
            type="date"
            id="date-of-death"
            data-testid="date-of-death-input"
            value={dateValue}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-card text-card-foreground px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="deceased-name" className="block text-sm font-medium text-foreground mb-2">
            Their name{" "}
            <span className="text-muted font-normal">(optional — for personalizing letters)</span>
          </label>
          <input
            type="text"
            id="deceased-name"
            data-testid="deceased-name-input"
            value={nameValue}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="First and last name"
            className="w-full rounded-lg border border-border bg-card text-card-foreground px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-warm-gray"
          />
        </div>
      </div>
    </div>
  );
}

export default function OnboardPage() {
  const router = useRouter();
  const setOnboardingData = useEstateStore((s) => s.setOnboardingData);

  const [step, setStep] = useState(1);
  const [state, setState] = useState("");
  const [relationship, setRelationship] = useState<Relationship | "">("");
  const [complexity, setComplexity] = useState<EstateComplexity | "">("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [deceasedName, setDeceasedName] = useState("");
  const [error, setError] = useState("");

  function validate(): boolean {
    switch (step) {
      case 1:
        if (!state) {
          setError("Please select a state to continue.");
          return false;
        }
        break;
      case 2:
        if (!relationship) {
          setError("Please select your relationship to continue.");
          return false;
        }
        break;
      case 3:
        if (!complexity) {
          setError("Please select an estate complexity level to continue.");
          return false;
        }
        break;
      case 4:
        if (!dateOfDeath) {
          setError("Please enter the date of passing to continue.");
          return false;
        }
        break;
    }
    setError("");
    return true;
  }

  function handleContinue() {
    if (!validate()) return;

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setOnboardingData({
        state,
        relationship: relationship as Relationship,
        estateComplexity: complexity as EstateComplexity,
        dateOfDeath: new Date(dateOfDeath + "T00:00:00").toISOString(),
        deceasedName: deceasedName.trim() || undefined,
      });
      router.push("/checklist");
    }
  }

  function handleBack() {
    if (step > 1) {
      setError("");
      setStep(step - 1);
    }
  }

  return (
    <div data-testid="onboard-page" className="min-h-[calc(100vh-8rem)]">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm text-muted">Take your time. There&apos;s no rush.</p>
        </div>

        <StepIndicator currentStep={step} />

        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="transition-opacity duration-200">
            {step === 1 && <StateStep value={state} onChange={setState} />}
            {step === 2 && <RelationshipStep value={relationship} onChange={setRelationship} />}
            {step === 3 && <ComplexityStep value={complexity} onChange={setComplexity} />}
            {step === 4 && (
              <DateStep
                dateValue={dateOfDeath}
                onDateChange={setDateOfDeath}
                nameValue={deceasedName}
                onNameChange={setDeceasedName}
              />
            )}
          </div>

          {error && (
            <p data-testid="onboard-error" className="mt-4 text-center text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                data-testid="onboard-back-button"
                onClick={handleBack}
                className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              type="button"
              data-testid="onboard-continue-button"
              onClick={handleContinue}
              className="rounded-lg bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-sm"
            >
              {step === TOTAL_STEPS ? "Get My Checklist" : "Continue"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Your information stays on your device. No account needed.
        </p>
      </div>
    </div>
  );
}
