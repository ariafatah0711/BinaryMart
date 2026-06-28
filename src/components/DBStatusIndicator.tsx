"use client";

import { useEffect, useState } from "react";

export default function DBStatusIndicator() {
  const [status, setStatus] = useState<"connecting" | "connected" | "failed">("connecting");
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("connected");
        } else {
          setStatus("failed");
          setError(data.error || "Unknown error");
        }
      })
      .catch((err) => {
        setStatus("failed");
        setError(err.message);
      });
  }, []);

  const dotColor =
    status === "connected"
      ? "bg-green-500"
      : status === "connecting"
        ? "bg-yellow-400 animate-pulse"
        : "bg-red-500";

  const label =
    status === "connected"
      ? "DB Connected"
      : status === "connecting"
        ? "Connecting..."
        : "DB Error";

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-2"
      >
        <span className={`w-3 h-3 rounded-full ${dotColor} shadow-lg`} />
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs min-w-[160px]">
          <p className="font-medium text-slate-800">{label}</p>
          {status === "failed" && error && (
            <p className="text-red-600 mt-1 break-words">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
