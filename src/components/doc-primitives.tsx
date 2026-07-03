import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function Code({ label, lang, children }: { label: string; lang: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = children.trim().split("\n");

  return (
    <div className="not-prose group/code rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden font-mono text-[12.5px] transition-all duration-300">
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-850 bg-[#121214]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-neutral-800" />
            <span className="size-2 rounded-full bg-neutral-800" />
            <span className="size-2 rounded-full bg-neutral-800" />
          </div>
          <span className="text-[11px] font-normal text-neutral-400">{label}</span>
          <span className="text-neutral-700">·</span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{lang}</span>
        </div>
        <button
          onClick={onCopy}
          aria-label="Copy"
          className="text-neutral-500 hover:text-neutral-200 transition-all p-1.5 hover:bg-[#121214] rounded-lg outline-none"
        >
          {copied ? (
            <Check strokeWidth={1.2} fill="none" className="size-3.5 text-purple-400/70" />
          ) : (
            <Copy strokeWidth={1.2} fill="none" className="size-3.5" />
          )}
        </button>
      </div>
      <pre className="px-5 py-4 text-neutral-300 leading-[1.75] overflow-x-auto flex gap-4 select-text">
        <div className="flex flex-col text-neutral-700 select-none text-right w-5 shrink-0 border-r border-neutral-800/30 pr-3">
          {lines.map((_, idx) => (
            <span key={idx}>{idx + 1}</span>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto scrollbar-none">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="hover:bg-[#121214] px-1 rounded transition-colors whitespace-pre"
            >
              {line || " "}
            </div>
          ))}
        </div>
      </pre>
    </div>
  );
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="not-prose space-y-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-4 items-start text-[13.5px] text-neutral-400 leading-relaxed group"
        >
          <span className="font-mono text-[10px] text-neutral-300 bg-[#121214] border border-neutral-800/30 rounded-lg px-2 py-0.5 shrink-0 mt-0.5">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex gap-4 rounded-xl border-l-2 border-l-neutral-500 bg-[#121214] px-5 py-4">
      <span className="size-2 rounded-full bg-neutral-600 mt-1.5 shrink-0" />
      <div className="text-[13px] text-neutral-300 leading-relaxed">{children}</div>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[12px] bg-[#121214] border border-neutral-800/30 px-1.5 py-0.5 rounded-md text-neutral-300">
      {children}
    </code>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-[10.5px] bg-[#121214] border border-neutral-800/30 rounded-md px-2 py-0.5 text-neutral-400 whitespace-nowrap inline-flex items-center">
      {children}
    </kbd>
  );
}

export function KeyTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 mb-2.5">
        {title}
      </p>
      <div className="rounded-xl border border-neutral-800/30 overflow-hidden bg-[#121214]">
        <table className="w-full text-[13px]">
          <tbody className="divide-y divide-neutral-900/40">
            {rows.map(([key, action]) => (
              <tr key={key} className="hover:bg-[#121214] transition-colors">
                <td className="px-5 py-2.5 w-48 shrink-0">
                  <kbd className="font-mono text-[10.5px] text-neutral-300 bg-[#121214] border border-neutral-800/30 rounded-md px-2 py-1 whitespace-nowrap inline-block">
                    {key}
                  </kbd>
                </td>
                <td className="px-5 py-2.5 text-neutral-400">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
