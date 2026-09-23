import { BackToTop } from "@/components/BackToTop";
import { ResourceCard } from "@/components/ResourceCard";
import { SiteLayout } from "@/components/SiteLayout";
import { categoryDefinitions, resourceCatalogue, type ResourceCategory } from "@/resourceCatalogue";
import { getResourceArchiveSearch, getSelectedResourceCategory } from "@/lib/resourceFilters";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";

export default function Resources() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const selectedCategory = getSelectedResourceCategory(search);
  const archiveSearch = getResourceArchiveSearch(search);
  const [query, setQuery] = useState("");
  const resources = resourceCatalogue;

  const filtered = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    return resources.filter(resource => {
      const categoryMatch = !selectedCategory || resource.category === selectedCategory;
      const queryMatch = !normalised || [resource.title, resource.summary, ...resource.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalised);
      return categoryMatch && queryMatch;
    });
  }, [query, selectedCategory, resources]);

  const chooseCategory = (category: ResourceCategory | null) => {
    setLocation(category ? `/resources?category=${category}` : "/resources");
  };

  return (
    <SiteLayout>
      <main id="main-content">
        <section className="archive-hero">
          <div className="container grid gap-8 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="section-kicker text-cyan">The complete archive</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[0.9] tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
                Explore every<br />tested resource.
              </h1>
            </div>
            <p className="max-w-lg text-base leading-8 text-white/62 lg:justify-self-end">
              Search by classroom purpose, browse by format and open any resource to copy the full prompt behind it.
            </p>
          </div>
        </section>

        <section className="bg-paper py-12 sm:py-16">
          <div className="container">
            <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className="folio-label text-slate">Filter by format</p>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Resource categories">
                  <button className={`filter-chip ${!selectedCategory ? "filter-chip-active" : ""}`} onClick={() => chooseCategory(null)}>All</button>
                  {categoryDefinitions.map(category => (
                    <button
                      key={category.id}
                      className={`filter-chip ${selectedCategory === category.id ? "filter-chip-active" : ""}`}
                      onClick={() => chooseCategory(category.id)}
                    >
                      {category.shortTitle}
                    </button>
                  ))}
                </div>
              </div>
              <label className="search-field">
                <Search size={18} aria-hidden="true" />
                <span className="sr-only">Search resources</span>
                <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search titles, tags or purposes" />
                {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={17} /></button> : null}
              </label>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <p className="text-sm text-slate"><strong className="text-ink">{filtered.length}</strong> resources shown</p>
              {selectedCategory ? (
                <p className="hidden text-xs font-bold uppercase tracking-[0.12em] text-slate sm:block">
                  {categoryDefinitions.find(category => category.id === selectedCategory)?.title}
                </p>
              ) : null}
            </div>

            {filtered.length ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((resource, index) => {
                  const feature = index === 0 || index === 9;
                  return (
                    <div key={resource.slug} className={feature ? "sm:col-span-2" : ""}>
                      <ResourceCard resource={resource} featured={feature} archiveSearch={archiveSearch} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="my-20 border border-dashed border-ink/25 px-6 py-16 text-center">
                <p className="font-display text-2xl font-bold">No resources match that search.</p>
                <button type="button" className="text-link mx-auto mt-5" onClick={() => setQuery("")}>Clear the search</button>
              </div>
            )}
          </div>
        </section>
      </main>
      <BackToTop />
    </SiteLayout>
  );
}
