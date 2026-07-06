"use client";

const inputCls =
  "w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--brand)]";
const removeBtnCls =
  "shrink-0 rounded-md border border-border px-2 py-1 text-xs text-red-600 hover:bg-red-50";
const addBtnCls =
  "mt-2 rounded-md border border-dashed border-border px-3 py-1.5 text-xs font-medium text-[var(--brand)] hover:bg-[var(--brand)]/5";

export function StringListEditor({
  items,
  onChange,
  placeholder,
  multiline,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          {multiline ? (
            <textarea
              rows={2}
              value={item}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={inputCls}
            />
          ) : (
            <input
              type="text"
              value={item}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={inputCls}
            />
          )}
          <button
            type="button"
            className={removeBtnCls}
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
          >
            Hapus
          </button>
        </div>
      ))}
      <button type="button" className={addBtnCls} onClick={() => onChange([...items, ""])}>
        + Tambah
      </button>
    </div>
  );
}

export function PimpinanListEditor({
  items,
  onChange,
}: {
  items: { jabatan: string; nama: string }[];
  onChange: (items: { jabatan: string; nama: string }[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item.jabatan}
            placeholder="Jabatan"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], jabatan: e.target.value };
              onChange(next);
            }}
            className={inputCls + " max-w-[40%]"}
          />
          <input
            type="text"
            value={item.nama}
            placeholder="Nama"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], nama: e.target.value };
              onChange(next);
            }}
            className={inputCls}
          />
          <button
            type="button"
            className={removeBtnCls}
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
          >
            Hapus
          </button>
        </div>
      ))}
      <button
        type="button"
        className={addBtnCls}
        onClick={() => onChange([...items, { jabatan: "", nama: "" }])}
      >
        + Tambah
      </button>
    </div>
  );
}

export { inputCls, removeBtnCls, addBtnCls };
