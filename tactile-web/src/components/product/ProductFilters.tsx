"use client";
import { useI18n } from "@/i18n/client";

import { useRef } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { CatalogFilters, MaterialCategoryView } from "@/types/product";
import { catalogUrl } from "@/lib/catalog";
function FilterForm({
  filters,
  materials,
  id,
}: {
  filters: CatalogFilters;
  materials: MaterialCategoryView[];
  id: string;
}) {
  const { t: tr, href: localizeHref } = useI18n();

  return (
    <form action={localizeHref("/produk")} method="get" className="filter-form">
      {!filters.demo && <input type="hidden" name="demo" value="0" />}
      <label htmlFor={`${id}-q`}>
        {tr("Cari produk")}
        <input
          id={`${id}-q`}
          name="q"
          type="search"
          maxLength={100}
          defaultValue={filters.q}
          placeholder={tr("Nama atau material…")}
        />
      </label>
      <label htmlFor={`${id}-fungsi`}>
        {tr("Fungsi")}
        <select id={`${id}-fungsi`} name="fungsi" defaultValue={filters.fungsi}>
          <option value="">{tr("Semua fungsi")}</option>
          <option value="guiding">{tr("Pemandu arah — garis")}</option>
          <option value="warning">{tr("Peringatan — titik")}</option>
        </select>
      </label>
      <label htmlFor={`${id}-bentuk`}>
        {tr("Bentuk produk")}
        <select
          id={`${id}-bentuk`}
          name="bentuk"
          defaultValue={filters.bentuk ?? ""}
        >
          <option value="">{tr("Semua bentuk")}</option>
          <option value="tiles">{tr("Tiles / pelat")}</option>
          <option value="studs">{tr("Studs / titik")}</option>
          <option value="strips">{tr("Batang pemandu arah")}</option>
          <option value="studs-strips">
            {tr("Studs & strips / titik dan batang")}
          </option>
        </select>
      </label>
      {materials.length > 1 && (
        <label htmlFor={`${id}-material`}>
          {tr("Material")}
          <select
            id={`${id}-material`}
            name="material"
            defaultValue={filters.material}
          >
            <option value="">{tr("Semua material")}</option>
            {materials.map((m) => (
              <option key={m.slug} value={m.slug}>
                {tr(m.name)}
              </option>
            ))}
          </select>
        </label>
      )}
      <label htmlFor={`${id}-grade`}>
        {tr("Grade pada sumber")}
        <select
          id={`${id}-grade`}
          name="grade"
          defaultValue={filters.grade ?? ""}
        >
          <option value="">{tr("Semua grade")}</option>
          {["304", "316", "316L"].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={`${id}-finishing`}>
        {tr("Finishing pada sumber")}
        <select
          id={`${id}-finishing`}
          name="finishing"
          defaultValue={filters.finishing ?? ""}
        >
          <option value="">{tr("Semua finishing")}</option>
          <option value="black">{tr("Hitam")}</option>
          <option value="natural">Natural</option>
        </select>
      </label>
      <label htmlFor={`${id}-urutan`}>
        {tr("Urutkan")}
        <select
          id={`${id}-urutan`}
          name="urutan"
          defaultValue={filters.urutan ?? ""}
        >
          <option value="">{tr("Pilihan katalog")}</option>
          <option value="az">{tr("Nama A–Z")}</option>
          <option value="za">{tr("Nama Z–A")}</option>
        </select>
      </label>
      <button className="button" type="submit">
        {tr("Terapkan filter")}
      </button>
      <a
        className="text-link"
        href={localizeHref(catalogUrl({ demo: filters.demo }))}
      >
        {tr("Reset semua")}
      </a>
    </form>
  );
}
export function ProductFilters(props: {
  filters: CatalogFilters;
  materials: MaterialCategoryView[];
}) {
  const { t: tr } = useI18n();

  const dialog = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }
  return (
    <>
      <aside className="catalog-sidebar" aria-label={tr("Filter katalog")}>
        <p className="eyebrow">{tr("SARING PRODUK")}</p>
        <FilterForm {...props} id="desktop" />
      </aside>
      <button
        ref={trigger}
        className="button outline mobile-filter-trigger"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <SlidersHorizontal size={17} />
        {tr("Cari & filter produk")}
      </button>
      <dialog
        ref={dialog}
        className="filter-dialog"
        aria-label={tr("Filter katalog produk")}
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="drawer-top">
          <strong>{tr("FILTER PRODUK")}</strong>
          <button onClick={close} aria-label={tr("Tutup filter")}>
            <X />
          </button>
        </div>
        <FilterForm {...props} id="mobile" />
      </dialog>
    </>
  );
}
