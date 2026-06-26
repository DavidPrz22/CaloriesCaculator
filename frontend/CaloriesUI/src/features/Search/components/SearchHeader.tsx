import { useI18n } from "@/lib/i18n";

export function SearchHeader() {
  const { t } = useI18n();

  return (
    <section className="mb-10 text-center">
      <span className="inline-block rounded-full border border-primary-soft/50 bg-accent/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
        {t("tagline")}
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-foreground sm:text-5xl">
        {t("home")}
      </h1>
    </section>
  );
}
