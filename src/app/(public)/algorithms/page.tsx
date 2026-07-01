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

// ==========================================
// BST Types & Helpers
// ==========================================
interface TreeNode {
  name: string;
  category: string;
  brand: string;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
}

interface BstFrame {
  tree: TreeNode | null;
  currentNode: string;
  visitedNodes: string[];
  activeComparison: string | null;
  insertedNodes: string[];
  action: "init" | "compare" | "insert" | "complete";
  log: string;
}

interface BstSearchFrame {
  tree: TreeNode | null;
  activeNodeName: string | null;
  visitedNodes: string[];
  matchedNodes: string[];
  action: "init" | "search-step" | "complete";
  log: string;
}

// Match the real bst.ts: uses string < operator on lowercased keys
function compareName(left: string, right: string): number {
  const a = left.toLowerCase();
  const b = right.toLowerCase();
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// Rearrange elements level-by-level to build a perfectly balanced BST
function getBalancedInsertOrder<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  if (arr.length === 0) return [];
  const sorted = [...arr].sort(compare);
  const result: T[] = [];

  function recurse(left: number, right: number) {
    if (left > right) return;
    const mid = Math.floor((left + right) / 2);
    result.push(sorted[mid]);
    recurse(left, mid - 1);
    recurse(mid + 1, right);
  }

  recurse(0, sorted.length - 1);
  return result;
}

function deepCloneTree(node: TreeNode | null): TreeNode | null {
  if (!node) return null;
  return {
    name: node.name,
    category: node.category,
    brand: node.brand,
    left: deepCloneTree(node.left),
    right: deepCloneTree(node.right),
    x: node.x,
    y: node.y,
  };
}

// Inorder traversal layout prevents horizontal node overlaps
function layoutTreeInorder(root: TreeNode | null, width: number, ySpacing: number = 75): TreeNode | null {
  if (!root) return null;

  const cloned = deepCloneTree(root);

  // 1. Gather nodes in inorder traversal sequence
  const inorderNodes: TreeNode[] = [];
  function inorder(node: TreeNode | null) {
    if (!node) return;
    inorder(node.left);
    inorderNodes.push(node);
    inorder(node.right);
  }
  inorder(cloned);

  const numNodes = inorderNodes.length;
  // Calculate spacing so nodes are spread across the width nicely
  const spacing = numNodes > 1 ? (width - 140) / (numNodes - 1) : 0;
  const startX = numNodes > 1 ? 70 : width / 2;

  // Assign x coordinates based on inorder index
  inorderNodes.forEach((node, index) => {
    node.x = startX + index * spacing;
  });

  // 2. Assign y coordinates based on depth
  function assignY(node: TreeNode | null, depth: number) {
    if (!node) return;
    node.y = (depth + 1) * ySpacing;
    assignY(node.left, depth + 1);
    assignY(node.right, depth + 1);
  }
  assignY(cloned, 0);

  return cloned;
}

interface VisualNode {
  name: string;
  x: number;
  y: number;
  isVisited: boolean;
  isActiveComparison: boolean;
  isInsertedThisStep: boolean;
  isMatched: boolean;
}

interface VisualEdge {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isActive: boolean;
}

function collectVisualElements(
  node: TreeNode | null,
  visitedNodes: string[],
  activeComparison: string | null,
  currentNode: string,
  action: string,
  matchedNodes: string[] = []
): { nodes: VisualNode[]; edges: VisualEdge[] } {
  const nodes: VisualNode[] = [];
  const edges: VisualEdge[] = [];

  function traverse(n: TreeNode | null, parent: TreeNode | null) {
    if (!n) return;

    const isVisited = visitedNodes.includes(n.name);
    const isActiveComp = activeComparison === n.name;
    const isInsertedThisStep = action === "insert" && currentNode === n.name;
    const isMatched = matchedNodes.includes(n.name);

    nodes.push({
      name: n.name,
      x: n.x || 0,
      y: n.y || 0,
      isVisited,
      isActiveComparison: isActiveComp,
      isInsertedThisStep,
      isMatched,
    });

    if (parent) {
      // Line is active if parent and child are consecutive in the visited path
      let isActive = false;
      const parentIdx = visitedNodes.indexOf(parent.name);
      const childIdx = visitedNodes.indexOf(n.name);
      if (parentIdx !== -1 && childIdx !== -1 && childIdx === parentIdx + 1) {
        isActive = true;
      }

      edges.push({
        fromX: parent.x || 0,
        fromY: parent.y || 0,
        toX: n.x || 0,
        toY: n.y || 0,
        isActive,
      });
    }

    traverse(n.left, n);
    traverse(n.right, n);
  }

  traverse(node, null);
  return { nodes, edges };
}

function generateBstFrames(products: { name: string; category: string; brand: string }[]): BstFrame[] {
  const frames: BstFrame[] = [];
  let root: TreeNode | null = null;
  const inserted: string[] = [];

  // Frame 0: Empty tree
  frames.push({
    tree: null,
    currentNode: "",
    visitedNodes: [],
    activeComparison: null,
    insertedNodes: [],
    action: "init",
    log: "Pohon pencarian biner (BST) siap dibangun dengan memasukkan data produk satu per satu secara alfabetis.",
  });

  products.forEach((product) => {
    const name = product.name;
    const visited: string[] = [];
    const path: string[] = [];

    function insertAndRecord(node: TreeNode | null): TreeNode {
      if (!node) {
        const newNode = { name, category: product.category, brand: product.brand, left: null, right: null };
        visited.push(name);
        frames.push({
          tree: null, // will be deepCloned below
          currentNode: name,
          visitedNodes: [...visited],
          activeComparison: null,
          insertedNodes: [...inserted, name],
          action: "insert",
          log: inserted.length === 0
            ? `Pohon kosong. Node "${name}" terpilih sebagai root.`
            : `Menemukan posisi kosong. Node "${name}" berhasil dimasukkan sebagai anak ${path[path.length - 1] || ""}.`,
        });
        return newNode;
      }

      visited.push(node.name);
      const isLeft = compareName(name, node.name) < 0;
      const direction = isLeft ? "kiri" : "kanan";
      path.push(`${direction} dari "${node.name}"`);

      frames.push({
        tree: deepCloneTree(root),
        currentNode: name,
        visitedNodes: [...visited],
        activeComparison: node.name,
        insertedNodes: [...inserted],
        action: "compare",
        log: `Membandingkan "${name}" dengan "${node.name}". Karena secara alfabetis "${name}" lebih ${isLeft ? "kecil (A-Z)" : "besar/sama (Z-A)"
          }, kita bergerak ke arah ${direction}.`,
      });

      const nextNode = { ...node };
      if (isLeft) {
        nextNode.left = insertAndRecord(node.left);
      } else {
        nextNode.right = insertAndRecord(node.right);
      }
      return nextNode;
    }

    const newRoot = insertAndRecord(root);
    root = newRoot;
    // Set actual tree snapshot for the end of this insertion sequence
    frames[frames.length - 1].tree = deepCloneTree(root);
    inserted.push(name);
  });

  frames.push({
    tree: deepCloneTree(root),
    currentNode: "",
    visitedNodes: [],
    activeComparison: null,
    insertedNodes: [...inserted],
    action: "complete",
    log: "BST selesai dibangun! Pencarian produk sekarang dapat dilakukan dengan efisiensi waktu O(log n).",
  });

  return frames;
}

// Generate Search steps based on Binary Search Tree search path logic (root -> leaf)
function generateBstSearchFrames(root: TreeNode | null, query: string): BstSearchFrame[] {
  const frames: BstSearchFrame[] = [];
  const path: string[] = [];
  const matched: string[] = [];
  const normalizedQuery = query.toLowerCase().trim();

  // Find all matches in the whole tree first, so we can highlight matching node(s) when reached
  const matches: string[] = [];
  function findMatches(node: TreeNode | null) {
    if (!node) return;
    const haystack = `${node.name} ${node.category} ${node.brand}`.toLowerCase();
    if (haystack.includes(normalizedQuery)) {
      matches.push(node.name);
    }
    findMatches(node.left);
    findMatches(node.right);
  }
  findMatches(root);

  // Frame 0: Start of search
  frames.push({
    tree: deepCloneTree(root),
    activeNodeName: null,
    visitedNodes: [],
    matchedNodes: [],
    action: "init",
    log: `Memulai pencarian biner (Binary Search) di BST untuk kata kunci "${query}". Pencarian berjalan turun dari root.`,
  });

  let current = root;
  let found = false;

  while (current) {
    path.push(current.name);

    const haystack = `${current.name} ${current.category} ${current.brand}`.toLowerCase();
    const isMatch = haystack.includes(normalizedQuery);

    if (isMatch) {
      matched.push(current.name);
      frames.push({
        tree: deepCloneTree(root),
        activeNodeName: current.name,
        visitedNodes: [...path],
        matchedNodes: [...matched],
        action: "search-step",
        log: `✓ Cocok! Kata kunci "${query}" ditemukan di dalam node "${current.name}". Pencarian sukses.`,
      });
      found = true;
      break;
    }

    frames.push({
      tree: deepCloneTree(root),
      activeNodeName: current.name,
      visitedNodes: [...path],
      matchedNodes: [],
      action: "search-step",
      log: `Memeriksa "${current.name}". Kata kunci "${query}" tidak cocok. Membandingkan secara alfabetis.`,
    });

    // Move left or right based on alphabetical comparison
    const cmp = compareName(normalizedQuery, current.name);
    if (cmp < 0) {
      frames.push({
        tree: deepCloneTree(root),
        activeNodeName: current.name,
        visitedNodes: [...path],
        matchedNodes: [],
        action: "search-step",
        log: `Secara alfabetis, "${query}" lebih kecil dari "${current.name}". Kita bergerak ke kiri.`,
      });
      current = current.left;
    } else {
      frames.push({
        tree: deepCloneTree(root),
        activeNodeName: current.name,
        visitedNodes: [...path],
        matchedNodes: [],
        action: "search-step",
        log: `Secara alfabetis, "${query}" lebih besar atau sama dengan "${current.name}". Kita bergerak ke kanan.`,
      });
      current = current.right;
    }
  }

  // Final Complete Frame
  if (found) {
    frames.push({
      tree: deepCloneTree(root),
      activeNodeName: null,
      visitedNodes: [...path],
      matchedNodes: [...matches],
      action: "complete",
      log: `Pencarian sukses! Menemukan ${matches.length} produk yang cocok: [${matches.join(", ")}].`,
    });
  } else {
    frames.push({
      tree: deepCloneTree(root),
      activeNodeName: null,
      visitedNodes: [...path],
      matchedNodes: [],
      action: "complete",
      log: `Pencarian selesai. Kata kunci "${query}" tidak ditemukan di dalam pohon BST.`,
    });
  }

  return frames;
}

// ==========================================
// Quick Sort Types & Helpers
// ==========================================
interface SortItem {
  value: number;
  label: string;
}

interface QuickSortFrame {
  array: SortItem[];
  i: number;
  j: number;
  pivotIndex: number;
  left: number;
  right: number;
  action: "init" | "partition-start" | "scan-i" | "stop-i" | "scan-j" | "stop-j" | "partition-meet" | "swap-before" | "swap-after" | "sorted-single" | "complete";
  log: string;
  sorted: boolean[];
}

function generateQuickSortFrames(initialArray: SortItem[]): QuickSortFrame[] {
  const frames: QuickSortFrame[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  const sorted = new Array(n).fill(false);

  function addFrame(
    currentArray: SortItem[],
    i: number,
    j: number,
    pivotIndex: number,
    left: number,
    right: number,
    action: QuickSortFrame["action"],
    log: string
  ) {
    frames.push({
      array: [...currentArray],
      i,
      j,
      pivotIndex,
      left,
      right,
      action,
      log,
      sorted: [...sorted],
    });
  }

  // Initial frame
  frames.push({
    array: [...arr],
    i: -1,
    j: -1,
    pivotIndex: -1,
    left: 0,
    right: n - 1,
    action: "init",
    log: "Data awal siap diurutkan dengan Quick Sort (Hoare's Partition).",
    sorted: [...sorted],
  });

  function quickSortHelper(l: number, r: number) {
    if (l < r) {
      const p = partition(l, r);
      quickSortHelper(l, p);
      quickSortHelper(p + 1, r);
    } else if (l === r) {
      sorted[l] = true;
      addFrame(arr, -1, -1, -1, l, r, "sorted-single", `Elemen "${arr[l].label}" (${arr[l].value}) sudah terurut karena ukuran sub-array = 1.`);
    }
  }

  function partition(l: number, r: number): number {
    const pivotVal = arr[l].value;
    const pivotLabel = arr[l].label;
    const pivotIdx = l;

    addFrame(
      arr,
      -1,
      -1,
      pivotIdx,
      l,
      r,
      "partition-start",
      `Memulai partisi Hoare pada sub-array [${l}..${r}]. Pivot dipilih "${pivotLabel}" (nilai: ${pivotVal}, indeks ${l}).`
    );

    let i = l - 1;
    let j = r + 1;

    while (true) {
      // Find leftmost element greater than or equal to pivot
      do {
        i++;
        addFrame(
          arr,
          i,
          j === r + 1 ? -1 : j,
          pivotIdx,
          l,
          r,
          "scan-i",
          `Pointer i bergerak ke kanan ke indeks ${i} ("${arr[i].label}", nilai: ${arr[i].value}). Memeriksa apakah nilai < pivot (${pivotVal}).`
        );
      } while (arr[i].value < pivotVal);

      addFrame(
        arr,
        i,
        j === r + 1 ? -1 : j,
        pivotIdx,
        l,
        r,
        "stop-i",
        `Pointer i berhenti di indeks ${i} karena nilai ${arr[i].value} >= pivot (${pivotVal}).`
      );

      // Find rightmost element smaller than or equal to pivot
      do {
        j--;
        addFrame(
          arr,
          i,
          j,
          pivotIdx,
          l,
          r,
          "scan-j",
          `Pointer j bergerak ke kiri ke indeks ${j} ("${arr[j].label}", nilai: ${arr[j].value}). Memeriksa apakah nilai > pivot (${pivotVal}).`
        );
      } while (arr[j].value > pivotVal);

      addFrame(
        arr,
        i,
        j,
        pivotIdx,
        l,
        r,
        "stop-j",
        `Pointer j berhenti di indeks ${j} karena nilai ${arr[j].value} <= pivot (${pivotVal}).`
      );

      if (i >= j) {
        addFrame(
          arr,
          i,
          j,
          pivotIdx,
          l,
          r,
          "partition-meet",
          `Pointer i (${i}) telah melewati atau bertemu dengan pointer j (${j}). Partisi selesai. Mengembalikan indeks partisi j = ${j}.`
        );
        return j;
      }

      addFrame(
        arr,
        i,
        j,
        pivotIdx,
        l,
        r,
        "swap-before",
        `Menukar "${arr[i].label}" (${arr[i].value}) di indeks ${i} dengan "${arr[j].label}" (${arr[j].value}) di indeks ${j}.`
      );

      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      // Track if the pivot index changed position due to the swap
      let newPivotIdx = pivotIdx;
      if (i === pivotIdx) newPivotIdx = j;
      else if (j === pivotIdx) newPivotIdx = i;

      addFrame(
        arr,
        i,
        j,
        newPivotIdx,
        l,
        r,
        "swap-after",
        `Selesai menukar. Sekarang indeks ${i} bernilai ${arr[i].value} dan indeks ${j} bernilai ${arr[j].value}.`
      );
    }
  }

  quickSortHelper(0, n - 1);

  // Final Complete State
  const finalSorted = new Array(n).fill(true);
  frames.push({
    array: [...arr],
    i: -1,
    j: -1,
    pivotIndex: -1,
    left: -1,
    right: -1,
    action: "complete",
    log: "Algoritma Quick Sort selesai! Semua elemen telah terurut dengan benar.",
    sorted: finalSorted,
  });

  return frames;
}

// Helper to format values for display
function formatValue(value: number, type: "price" | "rating" | "popularity" | "custom") {
  if (type === "price") {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(1)}jt`;
    }
    if (value >= 1000) {
      return `Rp ${(value / 1000).toFixed(0)}rb`;
    }
    return `Rp ${value}`;
  }
  return value.toString();
}

// Highlighting compiler output logs in terminal console
function formatLogMessage(log: string) {
  if (!log) return null;

  const parts = log.split(/("[^"]*")/g);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('"') && part.endsWith('"')) {
          return (
            <span key={index} className="text-amber-300 font-semibold">
              {part}
            </span>
          );
        }

        const words = part.split(
          /(\bpointer i\b|\bpointer j\b|\bpivot\b|\bmenukar\b|\bterurut\b|\bHoare\b|\bQuick Sort\b|\bindex\b|\bindeks\b)/gi
        );
        return (
          <span key={index}>
            {words.map((word, wIdx) => {
              const lowerWord = word.toLowerCase();
              if (lowerWord === "pointer i") {
                return (
                  <span key={wIdx} className="text-rose-400 font-bold">
                    {word}
                  </span>
                );
              }
              if (lowerWord === "pointer j") {
                return (
                  <span key={wIdx} className="text-emerald-400 font-bold">
                    {word}
                  </span>
                );
              }
              if (lowerWord === "pivot") {
                return (
                  <span key={wIdx} className="text-amber-400 font-bold">
                    {word}
                  </span>
                );
              }
              if (lowerWord === "menukar" || lowerWord === "tukar") {
                return (
                  <span key={wIdx} className="text-cyan-400 font-bold">
                    {word}
                  </span>
                );
              }
              if (lowerWord === "terurut" || lowerWord === "selesai") {
                return (
                  <span key={wIdx} className="text-emerald-400 font-bold">
                    {word}
                  </span>
                );
              }
              if (lowerWord === "hoare" || lowerWord === "quick sort") {
                return (
                  <span key={wIdx} className="text-indigo-400 font-bold">
                    {word}
                  </span>
                );
              }
              return word;
            })}
          </span>
        );
      })}
    </span>
  );
}

// ==========================================
// Reusable Controls Components
// ==========================================
function VisualizerControls({
  isPlaying,
  onPlayToggle,
  onPrev,
  onNext,
  onReset,
  step,
  total,
  speed,
  onSpeedChange,
}: {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  step: number;
  total: number;
  speed: number;
  onSpeedChange: (val: number) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={onPlayToggle}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition-all shadow-sm ${isPlaying ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isPlaying ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
              </svg>
              <span>Pause</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
              <span>Play</span>
            </>
          )}
        </button>

        <button
          onClick={onPrev}
          disabled={step === 0}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          title="Langkah Sebelumnya"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={onNext}
          disabled={step >= total - 1}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          title="Langkah Berikutnya"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={onReset}
          className="flex h-10 items-center justify-center rounded-lg bg-slate-100 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          title="Reset Simulasi"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-1 max-w-xs items-center gap-4 justify-end">
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
          Kecepatan: {(1000 / speed).toFixed(1)}x
        </span>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={2100 - speed}
          onChange={(e) => onSpeedChange(2100 - Number(e.target.value))}
          className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
        />
      </div>

      <div className="text-right">
        <span className="text-sm font-bold text-slate-700">
          Langkah {step + 1} <span className="font-normal text-slate-400">/ {total}</span>
        </span>
      </div>
    </div>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  const width = total > 1 ? (step / (total - 1)) * 100 : 0;

  return (
    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300" style={{ width: `${width}%` }} />
    </div>
  );
}

function ExplanationBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 p-4 shadow-sm">
      <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
        <svg className="h-4 w-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {title}
      </p>
      <div className="mt-2 text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

// ==========================================
// Main Component
// ==========================================
export default function AlgorithmsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // BST states
  const [bstProducts, setBstProducts] = useState<{ name: string; category: string; brand: string }[]>([]);
  const [bstStep, setBstStep] = useState(0);
  const [bstPlaying, setBstPlaying] = useState(false);
  const [bstSpeed, setBstSpeed] = useState(1000);
  const [customBstInput, setCustomBstInput] = useState("");

  // BST Search states
  const [bstMode, setBstMode] = useState<"build" | "search">("build");
  const [bstSearchQuery, setBstSearchQuery] = useState("");
  const [bstSearchStep, setBstSearchStep] = useState(0);
  const [bstSearchPlaying, setBstSearchPlaying] = useState(false);
  const [bstSearchQueryApplied, setBstSearchQueryApplied] = useState("");

  // QuickSort states
  const [sortField, setSortField] = useState<"price" | "rating" | "popularity" | "custom">("price");
  const [customSortValues, setCustomSortValues] = useState<number[]>([]);
  const [qsStep, setQsStep] = useState(0);
  const [qsPlaying, setQsPlaying] = useState(false);
  const [qsSpeed, setQsSpeed] = useState(1000);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        const nextProducts = data?.data?.products ?? data?.products ?? [];
        setProducts(nextProducts);

        // Initialize BST with 7 products, shuffled so the tree is balanced
        // Initialize BST with 7 products, ordered so that it builds a perfectly balanced BST
        const bstRaw = nextProducts.slice(0, 7).map((p: Product) => ({
          name: p.name,
          category: p.category,
          brand: p.brand,
        }));
        const sampleBst = getBalancedInsertOrder<{ name: string; category: string; brand: string }>(
          bstRaw,
          (a, b) => compareName(a.name, b.name)
        );
        setBstProducts(sampleBst);
      })
      .catch((err) => setError(err.message || "Gagal mengambil data produk."))
      .finally(() => setLoading(false));
  }, []);

  // BST Memoized build frames
  const bstSteps = useMemo(() => {
    return bstProducts.length > 0 ? generateBstFrames(bstProducts) : [];
  }, [bstProducts]);

  // Find final tree layout to perform search on
  const finalBstTree = useMemo(() => {
    if (bstSteps.length === 0) return null;
    return bstSteps[bstSteps.length - 1].tree;
  }, [bstSteps]);

  // BST Memoized search frames
  const bstSearchSteps = useMemo(() => {
    if (!finalBstTree || !bstSearchQueryApplied) return [];
    return generateBstSearchFrames(finalBstTree, bstSearchQueryApplied);
  }, [finalBstTree, bstSearchQueryApplied]);

  // Quick Sort Memoized items
  const sampleProducts12 = useMemo(() => products.slice(0, 12), [products]);

  const quickSortItems = useMemo<SortItem[]>(() => {
    if (sortField === "custom") {
      return customSortValues.map((val, idx) => ({
        value: val,
        label: `Angka Acak ${idx + 1}`,
      }));
    }
    return sampleProducts12
      .map((product) => ({
        value: Number(product[sortField]),
        label: product.name,
      }))
      .filter((item) => Number.isFinite(item.value));
  }, [sampleProducts12, sortField, customSortValues]);

  const quickSortSteps = useMemo(() => {
    return quickSortItems.length > 0 ? generateQuickSortFrames(quickSortItems) : [];
  }, [quickSortItems]);

  // Play controls loop for BST Build
  useEffect(() => {
    if (!bstPlaying) return;
    const interval = setInterval(() => {
      setBstStep((prev) => {
        if (prev >= bstSteps.length - 1) {
          setBstPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, bstSpeed);
    return () => clearInterval(interval);
  }, [bstPlaying, bstSpeed, bstSteps.length]);

  // Play controls loop for BST Search
  useEffect(() => {
    if (!bstSearchPlaying) return;
    const interval = setInterval(() => {
      setBstSearchStep((prev) => {
        if (prev >= bstSearchSteps.length - 1) {
          setBstSearchPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, bstSpeed);
    return () => clearInterval(interval);
  }, [bstSearchPlaying, bstSpeed, bstSearchSteps.length]);

  // Play controls loop for Quick Sort
  useEffect(() => {
    if (!qsPlaying) return;
    const interval = setInterval(() => {
      setQsStep((prev) => {
        if (prev >= quickSortSteps.length - 1) {
          setQsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, qsSpeed);
    return () => clearInterval(interval);
  }, [qsPlaying, qsSpeed, quickSortSteps.length]);

  // Reset steps on data source changes
  useEffect(() => {
    setBstStep(0);
    setBstPlaying(false);
    setBstMode("build");
  }, [bstProducts]);

  useEffect(() => {
    setQsStep(0);
    setQsPlaying(false);
  }, [quickSortItems]);

  // Insert custom product to BST
  const handleInsertCustomNode = () => {
    const newName = customBstInput.trim();
    if (!newName) return;

    if (bstProducts.some((p) => p.name === newName)) {
      alert("Produk dengan nama tersebut sudah ada di pohon!");
      return;
    }

    const newProductObj = {
      name: newName,
      category: "Kustom",
      brand: "Kustom",
    };

    const updatedProducts = [...bstProducts, newProductObj];
    setBstProducts(updatedProducts);
    setCustomBstInput("");
    setBstPlaying(false);
    setBstMode("build");

    // Jump to the start of this node's insertion sequence
    setTimeout(() => {
      const nextSteps = generateBstFrames(updatedProducts);
      const firstStepIdx = nextSteps.findIndex((step) => step.currentNode === newName);
      if (firstStepIdx !== -1) {
        setBstStep(firstStepIdx);
      }
    }, 0);
  };

  // BST Search trigger
  const handleBstSearch = () => {
    const query = bstSearchQuery.trim();
    if (!query) return;

    setBstSearchQueryApplied(query);
    setBstMode("search");
    setBstStep(0);
    setBstPlaying(false);
    setBstSearchStep(0);
    setBstSearchPlaying(true);
  };

  // Generate random data for Quick Sort
  const generateRandomArray = () => {
    const randomVals = Array.from({ length: 12 }, () => Math.ceil(Math.random() * 100));
    setCustomSortValues(randomVals);
    setSortField("custom");
    setQsStep(0);
    setQsPlaying(false);
  };

  // Select active frame & step total based on active BST mode
  const currentBst = bstMode === "search" ? bstSearchSteps[bstSearchStep] : bstSteps[bstStep];
  const totalBstSteps = bstMode === "search" ? bstSearchSteps.length : bstSteps.length;
  const currentQs = quickSortSteps[qsStep];

  // Lay out the tree using inorder spacing
  const laidOutTree = useMemo(() => {
    if (!currentBst || !currentBst.tree) return null;
    return layoutTreeInorder(currentBst.tree, 800, 75);
  }, [currentBst]);

  // Collect visual nodes and edges for rendering
  const bstVisuals = useMemo(() => {
    if (!laidOutTree || !currentBst) return { nodes: [], edges: [] };
    const matched = bstMode === "search" ? (currentBst as BstSearchFrame).matchedNodes : [];
    const activeComp = bstMode === "search"
      ? (currentBst as BstSearchFrame).activeNodeName
      : (currentBst as BstFrame).activeComparison;

    return collectVisualElements(
      laidOutTree,
      currentBst.visitedNodes,
      activeComp,
      (currentBst as BstFrame).currentNode || "",
      currentBst.action,
      matched
    );
  }, [laidOutTree, currentBst, bstMode]);

  const maxQsValue = useMemo(() => {
    if (quickSortItems.length === 0) return 1;
    return Math.max(...quickSortItems.map((item) => item.value), 1);
  }, [quickSortItems]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fafafa] pb-12">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-8 relative rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm overflow-hidden tech-grid">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Struktur Data & Algoritma
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Visualisasi Pencarian & Pengurutan Produk
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Halaman ini mendemonstrasikan proses di balik layar katalog BinaryMart: membangun pohon pencarian biner
              <strong> Binary Search Tree (BST)</strong> untuk pencarian data, serta melakukan pengurutan performa tinggi memakai algoritma
              <strong> Quick Sort dengan Hoare&apos;s Partition</strong> secara dinamis.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center gap-2">
            <svg className="h-5 w-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        {/* BST Visualizer Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 mb-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_320px] items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-sm font-bold">1</span>
                Binary Search Tree (BST)
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                BST adalah pohon pencarian biner di mana setiap node mematuhi aturan: nilai alfabetis yang lebih kecil masuk cabang kiri,
                sedangkan nilai yang lebih besar atau sama masuk cabang kanan. Halaman pencarian katalog memindai kata kunci dengan menyusuri pohon ini secara rekursif.
              </p>
            </div>
            <ExplanationBox title="Struktur & Pencarian Node BST">
              Setiap kotak menggambarkan produk. Warna <span className="text-blue-600 font-bold">Biru</span> menandakan node terpasang,
              warna <span className="text-amber-500 font-bold">Kuning</span> adalah node aktif, dan
              warna <span className="text-emerald-600 font-bold">Hijau</span> menandakan node yang cocok / baru ditambahkan.
            </ExplanationBox>
          </div>

          {/* Mode Selector Info Badge */}
          <div className="mt-4 flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs">
            <span className="font-semibold text-slate-600">Mode Visualisasi BST:</span>
            <span className={`px-2.5 py-1 rounded-full font-extrabold ${bstMode === "search"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-blue-100 text-blue-800"
              }`}>
              {bstMode === "search" ? "🔍 Mode Pencarian (Inorder)" : "🌳 Mode Pembangunan Pohon"}
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Urutan Antrean Pemasukan Data</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {loading ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
                ))
              ) : bstProducts.length === 0 ? (
                <p className="text-sm text-slate-500">Belum ada produk dimuat.</p>
              ) : (
                bstProducts.map((p) => {
                  const isCurrentBuild = bstMode === "build" && (currentBst as BstFrame)?.currentNode === p.name;
                  const isInserted = bstMode === "build" && (currentBst as BstFrame)?.insertedNodes.includes(p.name);

                  return (
                    <span
                      key={p.name}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${isCurrentBuild
                        ? "bg-amber-400 text-slate-900 border-amber-400 shadow-sm font-bold scale-105"
                        : isInserted || bstMode === "search"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-slate-500 border-slate-200"
                        }`}
                    >
                      {p.name}
                    </span>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 animate-pulse">
                Mengambil data produk...
              </div>
            ) : currentBst ? (
              <>
                <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50 p-4 min-h-[76px] flex flex-col justify-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Log Eksekusi</p>
                  <p className="text-sm font-medium text-slate-800 mt-1">{currentBst.log}</p>
                </div>

                {/* SVG Visualizer Canvas */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-[#fbfcfd] shadow-inner p-4 flex justify-center">
                  <div className="min-w-[800px] w-[800px] h-[350px] relative select-none">
                    {bstVisuals.nodes.length === 0 ? (
                      <div className="flex h-full w-full items-center justify-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                        Klik tombol Berikutnya atau Play untuk mulai merender pohon.
                      </div>
                    ) : (
                      <svg width="100%" height="100%" viewBox="0 0 800 350" className="overflow-visible">
                        {/* 1. Render Edges (Garis) */}
                        <g>
                          {bstVisuals.edges.map((edge, idx) => (
                            <g key={idx}>
                              {edge.isActive && (
                                <line
                                  x1={edge.fromX}
                                  y1={edge.fromY + 22}
                                  x2={edge.toX}
                                  y2={edge.toY - 22}
                                  stroke="#f59e0b"
                                  strokeWidth="6"
                                  strokeOpacity="0.4"
                                  strokeLinecap="round"
                                />
                              )}
                              <line
                                x1={edge.fromX}
                                y1={edge.fromY + 22}
                                x2={edge.toX}
                                y2={edge.toY - 22}
                                stroke={edge.isActive ? "#f59e0b" : "#e2e8f0"}
                                strokeWidth={edge.isActive ? "3" : "2"}
                                strokeLinecap="round"
                                className="transition-all duration-300"
                              />
                            </g>
                          ))}
                        </g>

                        {/* 2. Render Nodes (Kartu HTML di SVG) */}
                        <g>
                          {bstVisuals.nodes.map((node) => (
                            <foreignObject
                              key={node.name}
                              x={node.x - 65}
                              y={node.y - 22}
                              width={130}
                              height={44}
                              className="overflow-visible"
                            >
                              <div
                                className={`flex h-full w-full items-center justify-center rounded-lg border px-2 py-1 text-center text-[10px] font-bold shadow-sm transition-all duration-300 select-none ${node.isMatched
                                  ? "border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-100 animate-pulse ring-4 ring-emerald-100"
                                  : node.isInsertedThisStep
                                    ? "border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-600 text-white animate-bounce shadow-emerald-200"
                                    : node.isActiveComparison
                                      ? "border-amber-400 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 shadow-md ring-4 ring-amber-100 scale-105"
                                      : node.isVisited
                                        ? "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-100/50 text-indigo-900 ring-2 ring-indigo-50"
                                        : "border-slate-200 bg-white text-slate-800"
                                  }`}
                                style={{ wordBreak: "break-word" }}
                                title={node.name}
                              >
                                <span className="line-clamp-2 leading-tight">
                                  {node.isMatched ? "✓ " : ""}
                                  {node.name}
                                </span>
                              </div>
                            </foreignObject>
                          ))}
                        </g>
                      </svg>
                    )}
                  </div>
                </div>

                <Progress step={bstMode === "search" ? bstSearchStep : bstStep} total={totalBstSteps} />

                <VisualizerControls
                  isPlaying={bstMode === "search" ? bstSearchPlaying : bstPlaying}
                  onPlayToggle={() => {
                    if (bstMode === "search") {
                      setBstSearchPlaying(!bstSearchPlaying);
                    } else {
                      setBstPlaying(!bstPlaying);
                    }
                  }}
                  onPrev={() => {
                    if (bstMode === "search") {
                      setBstSearchStep((step) => Math.max(0, step - 1));
                    } else {
                      setBstStep((step) => Math.max(0, step - 1));
                    }
                  }}
                  onNext={() => {
                    if (bstMode === "search") {
                      setBstSearchStep((step) => Math.min(bstSearchSteps.length - 1, step + 1));
                    } else {
                      setBstStep((step) => Math.min(bstSteps.length - 1, step + 1));
                    }
                  }}
                  onReset={() => {
                    if (bstMode === "search") {
                      setBstSearchStep(0);
                      setBstSearchPlaying(false);
                    } else {
                      setBstStep(0);
                      setBstPlaying(false);
                    }
                  }}
                  step={bstMode === "search" ? bstSearchStep : bstStep}
                  total={totalBstSteps}
                  speed={bstSpeed}
                  onSpeedChange={setBstSpeed}
                />
              </>
            ) : (
              <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Tidak ada data untuk divisualisasikan.
              </p>
            )}

            {/* Custom Node Input and Search Area */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-4">
                {/* Build/Insert Mode Panel */}
                {bstMode === "build" ? (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-500 block mb-1">
                      Masukkan Produk Kustom Anda sendiri
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: Asus ROG Zephyrus G14"
                        value={customBstInput}
                        onChange={(e) => setCustomBstInput(e.target.value)}
                        className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none shadow-sm"
                      />
                      <button
                        onClick={handleInsertCustomNode}
                        className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm"
                      >
                        Masukkan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Pencarian Traversal (Inorder Search)
                      </label>
                      <button
                        onClick={() => {
                          setBstMode("build");
                          setBstSearchPlaying(false);
                          setBstSearchStep(0);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
                      >
                        Kembali ke Pembangunan Pohon
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Traversal inorder (seperti <code className="bg-slate-200 px-1 rounded text-[11px] font-bold text-slate-700">collectMatches</code> di code asli) menyusuri seluruh node dari kiri ke kanan untuk mencocokkan kata kunci.
                    </p>
                  </div>
                )}

                {/* Search query input */}
                <div className="border-t border-slate-200 pt-4">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500 block mb-1">
                    Cari Produk di Pohon (Traversal Inorder)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cari kata kunci, cth: Asus, ROG, Phone, Kustom..."
                      value={bstSearchQuery}
                      onChange={(e) => setBstSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleBstSearch();
                      }}
                      className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none shadow-sm"
                    />
                    <button
                      onClick={handleBstSearch}
                      className="h-10 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-sm flex items-center gap-1.5"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Cari
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QuickSort Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_320px] items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 text-sm font-bold">2</span>
                Quick Sort (Hoare&apos;s Partition)
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quick Sort menggunakan prinsip <em>Divide & Conquer</em> dengan memilih pivot dan mengatur ulang array:
                angka yang lebih kecil dipindahkan ke kiri, yang lebih besar ke kanan. Partisi Hoare bekerja dengan pointer ganda
                ($i$ & $j$) yang bergerak memusat, menukar elemen tak urut secara langsung untuk efisiensi memori.
              </p>
            </div>
            <ExplanationBox title="Skema Warna Visualisasi">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-slate-300 border border-slate-400 shrink-0" />
                  <span>Sub-array Pasif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-blue-400 shrink-0" />
                  <span>Sub-array Aktif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-amber-400 shrink-0 animate-pulse" />
                  <span>Pivot Terpilih</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-rose-500 shrink-0" />
                  <span>Sedang Dibandingkan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-cyan-400 shrink-0 animate-pulse" />
                  <span>Sedang Ditukar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-emerald-500 shrink-0" />
                  <span>Sudah Terurut</span>
                </div>
              </div>
            </ExplanationBox>
          </div>

          {/* Controls & Selectors */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-600 mr-2">Urutkan katalog:</span>
              {(["price", "rating", "popularity"] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => setSortField(field)}
                  className={`h-9 rounded-lg border px-3 text-xs font-semibold transition ${sortField === field
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                >
                  {field === "price" ? "Harga" : field === "rating" ? "Rating" : "Popularitas"}
                </button>
              ))}
            </div>

            <button
              onClick={generateRandomArray}
              className={`h-9 rounded-lg border px-3 text-xs font-semibold transition ${sortField === "custom"
                ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
            >
              Acak Angka Kustom
            </button>
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 animate-pulse">
                Mengambil data produk...
              </div>
            ) : currentQs ? (
              <>
                {/* Visual Bar Chart */}
                <div className="flex h-80 items-end justify-center gap-2 sm:gap-4 rounded-xl border border-slate-200 bg-[#fbfcfd] p-6 shadow-inner select-none overflow-x-auto">
                  <div className="flex items-end justify-center min-w-[600px] h-full w-full gap-2 sm:gap-4 relative pb-2">
                    {/* Pivot reference line */}
                    {currentQs.pivotIndex !== -1 && currentQs.array[currentQs.pivotIndex] && (
                      <div
                        className="absolute left-0 right-0 border-t-2 border-dashed border-amber-400/80 z-0 flex items-center justify-end px-2"
                        style={{
                          bottom: `${(currentQs.array[currentQs.pivotIndex].value / maxQsValue) * 170 + 38}px`,
                        }}
                      >
                        <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded shadow">
                          Pivot: {formatValue(currentQs.array[currentQs.pivotIndex].value, sortField)}
                        </span>
                      </div>
                    )}

                    {currentQs.array.map((item, idx) => {
                      const isI = idx === currentQs.i;
                      const isJ = idx === currentQs.j;
                      const isPivot = idx === currentQs.pivotIndex;
                      const isSorted = currentQs.sorted[idx];
                      const isActiveRange = idx >= currentQs.left && idx <= currentQs.right;

                      // Styles determination
                      let barBg = "bg-slate-300"; // default pasif
                      let borderStyle = "";

                      if (isSorted) {
                        barBg = "bg-gradient-to-t from-emerald-600 to-emerald-400";
                      } else if (currentQs.action === "swap-before" && (isI || isJ)) {
                        barBg = "bg-gradient-to-t from-cyan-500 to-cyan-300 animate-pulse";
                        borderStyle = "ring-4 ring-cyan-100";
                      } else if (isI || isJ) {
                        barBg = "bg-gradient-to-t from-rose-600 to-rose-400";
                        borderStyle = "ring-4 ring-rose-100";
                      } else if (isPivot) {
                        barBg = "bg-gradient-to-t from-amber-500 to-amber-400";
                        borderStyle = "ring-4 ring-amber-100";
                      } else if (isActiveRange) {
                        barBg = "bg-gradient-to-t from-blue-500 to-blue-400";
                      }

                      const barHeight = (item.value / maxQsValue) * 170;

                      return (
                        <div
                          key={`${item.label}-${idx}`}
                          className="flex flex-col items-center flex-1 max-w-[52px] group relative z-10 transition-all duration-300"
                        >
                          {/* 1. Floating pointer badges */}
                          <div className="h-6 w-full flex items-center justify-center mb-1">
                            {isI && isJ ? (
                              <span className="rounded bg-purple-600 px-1 py-0.5 text-[9px] font-extrabold text-white shadow animate-bounce">
                                i,j
                              </span>
                            ) : isI ? (
                              <span className="rounded bg-rose-500 px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow animate-bounce">
                                i
                              </span>
                            ) : isJ ? (
                              <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow animate-bounce">
                                j
                              </span>
                            ) : null}
                          </div>

                          {/* Tooltip on hover */}
                          <div className="absolute bottom-[240px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900 text-white rounded px-2.5 py-1.5 text-[10px] text-center w-36 shadow-lg z-20 leading-snug">
                            <span className="font-bold block truncate">{item.label}</span>
                            <span className="text-slate-400 block mt-0.5">
                              Nilai: {formatValue(item.value, sortField)}
                            </span>
                          </div>

                          {/* 2. Numerical Label */}
                          <span className="text-[10px] font-bold text-slate-600 mb-1.5 whitespace-nowrap">
                            {formatValue(item.value, sortField)}
                          </span>

                          {/* 3. Graphical Bar */}
                          <div
                            className={`w-full rounded-t-lg transition-all duration-300 ${barBg} ${borderStyle}`}
                            style={{ height: `${Math.max(16, barHeight)}px` }}
                          />

                          {/* 4. Index Label */}
                          <span className="text-[10px] font-bold text-slate-400 mt-1">{idx}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Console Log Terminal */}
                <div className="mt-4 rounded-xl bg-slate-900 border border-slate-800 p-4 shadow-lg min-h-[90px] flex flex-col justify-between font-mono">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Konsol Eksekusi Visualizer
                    </span>
                    <span className="text-[9px] text-slate-500">Hoare-QSort-Engine v1.0</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-6 select-text">
                    {formatLogMessage(currentQs.log)}
                  </p>
                </div>

                <Progress step={qsStep} total={quickSortSteps.length} />

                <VisualizerControls
                  isPlaying={qsPlaying}
                  onPlayToggle={() => setQsPlaying(!qsPlaying)}
                  onPrev={() => setQsStep((step) => Math.max(0, step - 1))}
                  onNext={() => setQsStep((step) => Math.min(quickSortSteps.length - 1, step + 1))}
                  onReset={() => setQsStep(0)}
                  step={qsStep}
                  total={quickSortSteps.length}
                  speed={qsSpeed}
                  onSpeedChange={setQsSpeed}
                />
              </>
            ) : (
              <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Tidak ada data untuk divisualisasikan.
              </p>
            )}
          </div>
        </section>

        {/* Catalog Integration section */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Implementasi di Fitur Katalog Real-Time</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Kedua algoritma ini bukan sekadar simulasi, melainkan dasar logika komputasi yang dijalankan pada katalog produk BinaryMart:
          </p>
          <div className="mt-5 grid gap-5 text-sm leading-6 text-slate-600 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/20">
              <p className="font-bold text-slate-900 flex items-center gap-2">
                <svg className="h-4.5 w-4.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Pencarian (BST)
              </p>
              <p className="mt-2 text-xs leading-relaxed">
                Membantu pencarian produk berdasarkan nama secara logaritmis. Proses pemindaian node membagi ruang pencarian sehingga performa tetap stabil meskipun katalog berisi puluhan ribu produk.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/20">
              <p className="font-bold text-slate-900 flex items-center gap-2">
                <svg className="h-4.5 w-4.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Pengurutan (Quick Sort)
              </p>
              <p className="mt-2 text-xs leading-relaxed">
                Diaktifkan saat Anda mengurutkan produk berdasarkan harga terendah, rating tertinggi, atau tingkat kepopuleran produk. Partisi Hoare mengurangi pemakaian memori sekunder secara signifikan.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/20">
              <p className="font-bold text-slate-900 flex items-center gap-2">
                <svg className="h-4.5 w-4.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                API Endpoint
              </p>
              <p className="mt-2 text-xs leading-relaxed">
                Kedua visualisasi ini memuat data aktual yang diakses dari server lokal melalui endpoint
                <code className="rounded bg-slate-100 px-1 text-[11px] text-purple-600 font-bold ml-1">/api/products</code> secara asinkron.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/catalog"
              className="inline-flex h-10 items-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow shadow-blue-200"
            >
              Coba Langsung di Katalog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
