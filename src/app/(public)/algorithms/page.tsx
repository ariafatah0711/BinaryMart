"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  popularity: number;
}

interface TreeNode {
  name: string;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface BstState {
  tree: (string | null)[][];
  root: TreeNode | null;
  inserted: string[];
  highlight: string | null;
  title: string;
  explanation: string;
}

interface QuickSortState {
  bars: { value: number; label: "lower" | "pivot" | "higher" | "sorted" | "idle" }[];
  title: string;
  explanation: string;
  pivot?: number;
  lower?: number[];
  higher?: number[];
}

const BAR_STYLE = {
  idle: "bg-slate-300",
  lower: "bg-emerald-500",
  pivot: "bg-amber-500",
  higher: "bg-blue-500",
  sorted: "bg-slate-900",
};

function compareName(left: string, right: string) {
  return left.toLowerCase().localeCompare(right.toLowerCase());
}

function insertNode(node: TreeNode | null, name: string): { root: TreeNode; path: string[] } {
  if (!node) {
    return { root: { name, left: null, right: null }, path: [] };
  }

  const nextNode: TreeNode = { ...node };
  const goLeft = compareName(name, node.name) < 0;
  const pathText = `${node.name} -> ${goLeft ? "kiri" : "kanan"}`;

  if (goLeft) {
    const result = insertNode(node.left, name);
    nextNode.left = result.root;
    return { root: nextNode, path: [pathText, ...result.path] };
  }

  const result = insertNode(node.right, name);
  nextNode.right = result.root;
  return { root: nextNode, path: [pathText, ...result.path] };
}

function treeToGrid(root: TreeNode | null): (string | null)[][] {
  if (!root) return [];

  const rows: (string | null)[][] = [];

  function fill(node: TreeNode | null, level: number, index: number) {
    if (!rows[level]) rows[level] = [];
    rows[level][index] = node ? node.name : null;

    if (node) {
      fill(node.left, level + 1, index * 2);
      fill(node.right, level + 1, index * 2 + 1);
    }
  }

  fill(root, 0, 0);

  return rows.map((row, level) => {
    const width = 2 ** level;
    return Array.from({ length: width }, (_, index) => row[index] ?? null);
  });
}

function makeBstSteps(names: string[]): BstState[] {
  const steps: BstState[] = [
    {
      tree: [],
      root: null,
      inserted: [],
      highlight: null,
      title: "Data produk siap dimasukkan",
      explanation: "BST akan memasukkan nama produk satu per satu. Jika nama lebih kecil secara alfabet, masuk ke kiri. Jika lebih besar atau sama, masuk ke kanan.",
    },
  ];

  let root: TreeNode | null = null;

  names.forEach((name, index) => {
    const result = insertNode(root, name);
    root = result.root;

    steps.push({
      tree: treeToGrid(root),
      root,
      inserted: names.slice(0, index + 1),
      highlight: name,
      title: index === 0 ? `${name} menjadi root` : `${name} dimasukkan ke pohon`,
      explanation:
        index === 0
          ? "Node pertama selalu menjadi root karena pohon masih kosong."
          : `Jalur perbandingan: ${result.path.join(", ")}. Node baru berhenti saat menemukan posisi kosong.`,
    });
  });

  steps.push({
    tree: treeToGrid(root),
    root,
    inserted: [...names],
    highlight: null,
    title: "BST selesai dibangun",
    explanation: "Kalau pohon dibaca dengan inorder traversal, urutannya menjadi kiri, root, lalu kanan. Hasilnya nama produk tersusun alfabetis.",
  });

  return steps;
}

function makeQuickSortSteps(values: number[]): QuickSortState[] {
  const makeBars = (
    arr: number[],
    labels: Record<number, QuickSortState["bars"][number]["label"]> = {}
  ): QuickSortState["bars"] => arr.map((value, index) => ({ value, label: labels[index] ?? "idle" }));

  const steps: QuickSortState[] = [
    {
      bars: makeBars(values),
      title: "Data angka siap diurutkan",
      explanation: "QuickSort memilih satu pivot, lalu memisahkan angka lain menjadi dua kelompok: lebih kecil dari pivot dan lebih besar atau sama dengan pivot.",
    },
  ];

  function sortRange(arr: number[], start: number, end: number, depth = 0): number[] {
    if (end - start <= 1) {
      const labels: Record<number, QuickSortState["bars"][number]["label"]> = {};
      if (end - start === 1) labels[start] = "sorted";
      steps.push({
        bars: makeBars(arr, labels),
        title: `Segmen [${arr.slice(start, end).join(", ") || "-"}] sudah aman`,
        explanation: "Segmen dengan nol atau satu data tidak perlu dipartisi lagi. Data lain tetap ditampilkan supaya posisinya tidak terasa hilang.",
      });
      return arr;
    }

    const part = arr.slice(start, end);
    const [pivot, ...rest] = part;
    const lower = rest.filter((value) => value < pivot);
    const higher = rest.filter((value) => value >= pivot);
    const arrangedPart = [...lower, pivot, ...higher];
    const nextArr = [...arr.slice(0, start), ...arrangedPart, ...arr.slice(end)];
    const labels: Record<number, QuickSortState["bars"][number]["label"]> = {};

    lower.forEach((_, index) => {
      labels[start + index] = "lower";
    });
    labels[start + lower.length] = "pivot";
    higher.forEach((_, index) => {
      labels[start + lower.length + 1 + index] = "higher";
    });

    steps.push({
      bars: makeBars(nextArr, labels),
      title: `Pivot ${pivot} pada level ${depth + 1}`,
      explanation: `Dari [${part.join(", ")}], angka yang lebih kecil masuk kiri: [${lower.join(", ") || "-"}]. Angka yang lebih besar atau sama masuk kanan: [${higher.join(", ") || "-"}].`,
      pivot,
      lower,
      higher,
    });

    const afterLower = sortRange(nextArr, start, start + lower.length, depth + 1);
    return sortRange(afterLower, start + lower.length + 1, end, depth + 1);
  }

  const sorted = sortRange(values, 0, values.length);

  steps.push({
    bars: makeBars(sorted, Object.fromEntries(sorted.map((_, index) => [index, "sorted"]))),
    title: "QuickSort selesai",
    explanation: `Hasil akhir: [${sorted.join(", ")}]. Rata-rata kompleksitas QuickSort adalah O(n log n), tetapi bisa menjadi O(n^2) kalau pivot selalu buruk.`,
  });

  return steps;
}

function StepControls({
  step,
  total,
  onPrev,
  onNext,
  onReset,
}: {
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={onPrev}
        disabled={step === 0}
        className="h-10 rounded-[6px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <span className="min-w-24 text-center text-sm font-semibold text-slate-500">
        {step + 1} / {total}
      </span>
      <button
        onClick={onNext}
        disabled={step >= total - 1}
        className="h-10 rounded-[6px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Berikutnya
      </button>
      <button
        onClick={onReset}
        className="h-10 rounded-[6px] bg-slate-100 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
      >
        Reset
      </button>
    </div>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  const width = total > 1 ? (step / (total - 1)) * 100 : 0;

  return (
    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${width}%` }} />
    </div>
  );
}

function TreeGrid({ grid, highlight }: { grid: (string | null)[][]; highlight: string | null }) {
  if (grid.length === 0) {
    return (
      <div className="flex min-h-52 items-center justify-center rounded-[6px] border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm text-slate-500">
        Klik Berikutnya untuk mulai membangun BST.
      </div>
    );
  }

  const levels = grid.length;
  const totalWidth = Math.max(520, 2 ** (levels - 1) * 112);

  return (
    <div className="overflow-x-auto rounded-[6px] border border-slate-200 bg-slate-50 p-5">
      <div className="mx-auto flex flex-col items-center gap-4" style={{ minWidth: totalWidth }}>
        {grid.map((row, level) => {
          const cellWidth = totalWidth / row.length;

          return (
            <div key={level} className="flex" style={{ width: totalWidth }}>
              {row.map((name, index) => (
                <div key={`${level}-${index}`} className="flex justify-center" style={{ width: cellWidth }}>
                  {name ? (
                    <div
                      className={`max-w-32 truncate rounded-[6px] px-3 py-2 text-xs font-bold shadow-sm transition ${
                        highlight === name ? "bg-amber-500 text-white ring-4 ring-amber-100" : "bg-blue-600 text-white"
                      }`}
                      title={name}
                    >
                      {name}
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full border border-dashed border-slate-200" />
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExplanationBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[6px] border border-blue-100 bg-blue-50 p-4">
      <p className="text-sm font-bold text-blue-900">{title}</p>
      <div className="mt-2 text-sm leading-6 text-blue-900/80">{children}</div>
    </div>
  );
}

export default function AlgorithmsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bstStep, setBstStep] = useState(0);
  const [sortField, setSortField] = useState<"price" | "rating" | "popularity">("price");
  const [qsStep, setQsStep] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        const nextProducts = data?.data?.products ?? data?.products ?? [];
        setProducts(nextProducts);
      })
      .catch((err) => setError(err.message || "Gagal mengambil data produk."))
      .finally(() => setLoading(false));
  }, []);

  const sampleProducts = useMemo(() => products.slice(0, 7), [products]);
  const bstNames = useMemo(() => sampleProducts.map((product) => product.name), [sampleProducts]);
  const bstSteps = useMemo(() => (bstNames.length > 0 ? makeBstSteps(bstNames) : []), [bstNames]);

  const quickSortValues = useMemo(
    () => sampleProducts.map((product) => Number(product[sortField])).filter((value) => Number.isFinite(value)),
    [sampleProducts, sortField]
  );
  const quickSortSteps = useMemo(
    () => (quickSortValues.length > 0 ? makeQuickSortSteps(quickSortValues) : []),
    [quickSortValues]
  );

  useEffect(() => setBstStep(0), [bstSteps]);
  useEffect(() => setQsStep(0), [quickSortSteps]);

  const bst = bstSteps[bstStep];
  const quickSort = quickSortSteps[qsStep];
  const maxValue = Math.max(...quickSortValues, 1);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Struktur Data dan Algoritma</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Cara BinaryMart mencari dan mengurutkan produk
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Halaman ini menjelaskan dua bagian utama di katalog: Binary Search Tree untuk pencarian produk, dan
            QuickSort untuk pengurutan harga, rating, atau popularitas. Contohnya memakai data produk asli dari API.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-[6px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="rounded-[6px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">1. Binary Search Tree (BST)</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                BST adalah pohon pencarian. Setiap node punya aturan: nilai yang lebih kecil masuk cabang kiri,
                sedangkan nilai yang lebih besar atau sama masuk cabang kanan. Di BinaryMart, nama produk dipakai
                sebagai kunci pencarian.
              </p>
            </div>
            <ExplanationBox title="Intinya">
              Search term dibandingkan dengan nama, kategori, dan brand. Pohon membantu data tersusun sehingga hasil
              pencarian bisa dikumpulkan dengan traversal yang terarah.
            </ExplanationBox>
          </div>

          <div className="mt-5 rounded-[6px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Data contoh yang dimasukkan</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {loading ? (
                Array.from({ length: 7 }).map((_, index) => <div key={index} className="h-8 w-24 animate-pulse rounded-[6px] bg-slate-200" />)
              ) : bstNames.length === 0 ? (
                <p className="text-sm text-slate-500">Belum ada produk.</p>
              ) : (
                bstNames.map((name) => (
                  <span
                    key={name}
                    className={`rounded-[6px] px-3 py-1.5 text-xs font-semibold ${
                      bst?.inserted.includes(name) ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
                    }`}
                  >
                    {name}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="flex min-h-52 items-center justify-center rounded-[6px] border border-slate-200 bg-slate-50 text-sm text-slate-500">
                Mengambil data produk...
              </div>
            ) : bst ? (
              <>
                <ExplanationBox title={bst.title}>{bst.explanation}</ExplanationBox>
                <div className="mt-5">
                  <TreeGrid grid={bst.tree} highlight={bst.highlight} />
                </div>
                <Progress step={bstStep} total={bstSteps.length} />
                <StepControls
                  step={bstStep}
                  total={bstSteps.length}
                  onPrev={() => setBstStep((step) => Math.max(0, step - 1))}
                  onNext={() => setBstStep((step) => Math.min(bstSteps.length - 1, step + 1))}
                  onReset={() => setBstStep(0)}
                />
              </>
            ) : (
              <p className="rounded-[6px] border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Tidak ada data untuk divisualisasikan.
              </p>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-[6px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">2. QuickSort</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                QuickSort mengurutkan data dengan cara memilih pivot. Data yang lebih kecil dari pivot ditaruh di
                kiri, data yang lebih besar atau sama ditaruh di kanan. Proses ini diulang untuk tiap bagian sampai
                semua data urut.
              </p>
            </div>
            <ExplanationBox title="Warna bar">
              Hijau berarti lebih kecil dari pivot, kuning berarti pivot, biru berarti lebih besar atau sama, dan
              hitam berarti hasil akhir sudah urut.
            </ExplanationBox>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-slate-600">Urutkan berdasarkan:</span>
            {(["price", "rating", "popularity"] as const).map((field) => (
              <button
                key={field}
                onClick={() => setSortField(field)}
                className={`h-9 rounded-[6px] border px-3 text-sm font-semibold transition ${
                  sortField === field
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {field === "price" ? "Harga" : field === "rating" ? "Rating" : "Popularitas"}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="flex min-h-72 items-center justify-center rounded-[6px] border border-slate-200 bg-slate-50 text-sm text-slate-500">
                Mengambil data produk...
              </div>
            ) : quickSort ? (
              <>
                <ExplanationBox title={quickSort.title}>
                  <p>{quickSort.explanation}</p>
                  {quickSort.pivot !== undefined && (
                    <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
                      <div className="rounded-[6px] bg-white/70 p-2">Pivot: {quickSort.pivot}</div>
                      <div className="rounded-[6px] bg-white/70 p-2">Kiri: [{quickSort.lower?.join(", ") || "-"}]</div>
                      <div className="rounded-[6px] bg-white/70 p-2">Kanan: [{quickSort.higher?.join(", ") || "-"}]</div>
                    </div>
                  )}
                </ExplanationBox>

                <div className="mt-5 flex h-72 items-end justify-center gap-2 rounded-[6px] border border-slate-200 bg-slate-50 p-4 sm:gap-3">
                  {quickSort.bars.map((bar, index) => (
                    <div key={`${bar.value}-${index}`} className="flex min-w-8 flex-col items-center gap-2">
                      <div
                        className={`w-8 rounded-t-[6px] transition-all duration-300 sm:w-11 ${BAR_STYLE[bar.label]}`}
                        style={{ height: `${Math.max(18, (bar.value / maxValue) * 190)}px` }}
                      />
                      <span className="text-[11px] font-bold text-slate-600">{bar.value}</span>
                    </div>
                  ))}
                </div>

                <Progress step={qsStep} total={quickSortSteps.length} />
                <StepControls
                  step={qsStep}
                  total={quickSortSteps.length}
                  onPrev={() => setQsStep((step) => Math.max(0, step - 1))}
                  onNext={() => setQsStep((step) => Math.min(quickSortSteps.length - 1, step + 1))}
                  onReset={() => setQsStep(0)}
                />
              </>
            ) : (
              <p className="rounded-[6px] border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Tidak ada data untuk divisualisasikan.
              </p>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-[6px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-950">Hubungannya dengan fitur katalog</h2>
          <div className="mt-4 grid gap-4 text-sm leading-6 text-slate-600 md:grid-cols-3">
            <div className="rounded-[6px] border border-slate-200 p-4">
              <p className="font-bold text-slate-900">Search</p>
              <p className="mt-2">Saat user mengetik keyword, API membuat BST dari produk lalu mencari nama, kategori, dan brand yang cocok.</p>
            </div>
            <div className="rounded-[6px] border border-slate-200 p-4">
              <p className="font-bold text-slate-900">Sort</p>
              <p className="mt-2">Saat user memilih harga, rating, atau popularitas, API memakai QuickSort untuk mengurutkan data.</p>
            </div>
            <div className="rounded-[6px] border border-slate-200 p-4">
              <p className="font-bold text-slate-900">API</p>
              <p className="mt-2">
                Endpoint yang dipakai: <code className="rounded bg-slate-100 px-1">/api/products</code>.
              </p>
            </div>
          </div>
          <Link
            href="/catalog"
            className="mt-5 inline-flex h-10 items-center rounded-[6px] bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Coba di katalog
          </Link>
        </section>
      </div>
    </main>
  );
}
