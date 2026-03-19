export interface TimelineTask {
  title: string;
  description: string;
  whoToCall?: string;
  documentsNeeded?: string[];
  mistakesToAvoid?: string;
}

interface TimelineSectionProps {
  id: string;
  timeframe: string;
  title: string;
  description: string;
  tasks: TimelineTask[];
}

export function TimelineSection({
  id,
  timeframe,
  title,
  description,
  tasks,
}: TimelineSectionProps) {
  return (
    <section data-testid={`timeline-${id}`} className="mt-12" id={id}>
      <div className="flex items-start gap-4 mb-4">
        <span
          data-testid={`timeline-badge-${id}`}
          className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white uppercase tracking-wide"
        >
          {timeframe}
        </span>
        <div>
          <h2
            data-testid={`timeline-heading-${id}`}
            className="text-2xl font-bold text-foreground"
          >
            {title}
          </h2>
          <p className="mt-1 text-muted">{description}</p>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            data-testid={`task-${id}-${index}`}
            className="rounded-lg border border-border p-5"
          >
            <h3 className="font-semibold text-foreground text-lg">
              {task.title}
            </h3>
            <p className="mt-2 text-foreground leading-relaxed">
              {task.description}
            </p>

            {task.whoToCall && (
              <div className="mt-3 rounded bg-secondary p-3">
                <p className="text-sm font-medium text-foreground">
                  Who to call:
                </p>
                <p className="text-sm text-foreground mt-1">{task.whoToCall}</p>
              </div>
            )}

            {task.documentsNeeded && task.documentsNeeded.length > 0 && (
              <div className="mt-3 rounded bg-secondary p-3">
                <p className="text-sm font-medium text-foreground">
                  Documents you&apos;ll need:
                </p>
                <ul className="mt-1 list-disc list-inside text-sm text-foreground space-y-0.5">
                  {task.documentsNeeded.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}

            {task.mistakesToAvoid && (
              <div className="mt-3 rounded bg-destructive/10 border border-destructive/20 p-3">
                <p className="text-sm font-medium text-foreground">
                  Common mistake to avoid:
                </p>
                <p className="text-sm text-foreground mt-1">
                  {task.mistakesToAvoid}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
