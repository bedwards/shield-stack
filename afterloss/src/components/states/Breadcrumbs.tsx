import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-testid="breadcrumbs"
      className="text-sm text-muted mb-6"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted">
                &rsaquo;
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                data-testid={`breadcrumb-${i}`}
                className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span data-testid={`breadcrumb-${i}`} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
