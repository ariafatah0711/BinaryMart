"use client";

import { useEffect, useRef, useState } from "react";

function useOnScreen(ref: React.RefObject<HTMLDivElement | null>, threshold = 0.3) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}

function BSTVisualizer({ visible }: { visible: boolean }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setExpanded(true), 400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-8 sm:gap-16">
        {/* Root */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-blue-600/20 mx-auto">
            G16
          </div>
          <div className="text-[10px] text-blue-600 font-semibold mt-1 text-center">ROOT</div>
        </div>
      </div>

      {expanded && (
        <>
          {/* Level 1 - Lines */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 w-full max-w-xs">
            <div className="w-px h-6 bg-blue-300"></div>
            <div className="w-px h-6 bg-blue-300"></div>
          </div>

          <div className="flex items-center justify-center gap-8 sm:gap-16">
            <div
              className="transition-all duration-700 delay-200"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-[10px] shadow-md shadow-blue-500/20 mx-auto">
                iPhone
              </div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1 text-center">LEFT</div>
            </div>
            <div
              className="transition-all duration-700 delay-500"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-[10px] shadow-md shadow-blue-500/20 mx-auto">
                K2 V2
              </div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1 text-center">RIGHT</div>
            </div>
          </div>

          {/* Level 2 */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-xs">
            <div className="w-px h-5 bg-blue-200"></div>
            <div className="w-px h-5 bg-blue-200"></div>
            <div className="w-px h-5 bg-blue-200"></div>
            <div className="w-px h-5 bg-blue-200"></div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {["G Pro", "27GP", "S.24", "XPS"].map((label, i) => (
              <div
                key={label}
                className="transition-all duration-700"
                style={{ transitionDelay: `${800 + i * 200}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-400/80 text-white flex items-center justify-center font-bold text-[9px] shadow-sm mx-auto">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function QuickSortVisualizer({ visible }: { visible: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible]);

  const bars = [
    { h: 30, label: "P", pivot: true },
    { h: 80, label: "A" },
    { h: 45, label: "B" },
    { h: 100, label: "C" },
    { h: 60, label: "D" },
    { h: 20, label: "E" },
    { h: 75, label: "F" },
  ];

  const getBarColor = (index: number, bar: typeof bars[number]) => {
    if (bar.pivot && phase >= 1) return "bg-amber-500";
    if (phase >= 2) {
      if (bar.h < 50) return "bg-emerald-500";
      return "bg-blue-500";
    }
    return "bg-slate-400";
  };

  const getBarHeight = (bar: typeof bars[number]) => {
    if (phase < 2) return bar.h;
    if (bar.h < 50) return bar.h * 0.7;
    return bar.h;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end justify-center gap-1 sm:gap-2 h-32">
        {bars.map((bar, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`w-7 sm:w-10 rounded-t-md transition-all duration-700 ${getBarColor(i, bar)}`}
              style={{ height: `${getBarHeight(bar)}px` }}
            ></div>
            <span className="text-[9px] font-mono text-slate-500">{bar.label}</span>
          </div>
        ))}
      </div>

      {phase >= 1 && (
        <div className="transition-all duration-500 text-xs text-slate-600 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
          {phase === 1 && "Pivot: First element (P). Partitioning rest..."}
          {phase === 2 && "Lower &lt; P (green) | Higher &ge; P (blue) → Recursively sort"}
          {phase === 3 && "✓ Sorted! O(n log n) average case"}
        </div>
      )}
    </div>
  );
}

export default function AlgorithmVisualizer() {
  const bstRef = useRef<HTMLDivElement>(null);
  const qsRef = useRef<HTMLDivElement>(null);
  const bstVisible = useOnScreen(bstRef);
  const qsVisible = useOnScreen(qsRef);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900">See Algorithms in Action</h2>
          <p className="text-slate-500 mt-3 text-sm">Scroll down to see how BST and QuickSort work with real data.</p>
        </div>

        <div className="space-y-24">
          {/* BST */}
          <div ref={bstRef} className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">BST — Binary Search Tree</h3>
                <p className="text-sm text-slate-500">Inorder traversal collecting matches in O(log n) time</p>
              </div>
            </div>
            <BSTVisualizer visible={bstVisible} />
            <p className="text-xs text-slate-400 text-center mt-6">
              Products are indexed by name. Search traverses left → root → right collecting matches.
            </p>
          </div>

          {/* QuickSort */}
          <div ref={qsRef} className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">QuickSort</h3>
                <p className="text-sm text-slate-500">Partition by pivot, recursively sort lower + higher</p>
              </div>
            </div>
            <QuickSortVisualizer visible={qsVisible} />
            <p className="text-xs text-slate-400 text-center mt-6">
              First element is pivot. Elements are partitioned into lower (green) and higher (blue).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
