"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/shared/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const W = "#6B1A2A";
const I = "#F7F3EC";
const B = "#1C1410";
const M = "#7A6A60";
const WA = (a: number) => `rgba(107,26,42,${a})`;

export function UserMenu() {
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!email) return null;

  const initial = email[0].toUpperCase();

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((o) => !o)}
        title={email}
        style={{
          width: 34, height: 34, borderRadius: "50%",
          background: W, border: `2px solid transparent`,
          cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 13, color: I, fontWeight: 500,
          transition: "box-shadow 0.15s",
          boxShadow: open ? `0 0 0 3px ${WA(0.2)}` : "none",
        }}
      >
        {initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: 42, right: 0,
          background: "white", borderRadius: 10,
          border: `0.5px solid ${WA(0.14)}`,
          boxShadow: "0 8px 32px rgba(28,20,16,0.1)",
          minWidth: 210, zIndex: 200, overflow: "hidden",
        }}>
          {/* Signed in as */}
          <div style={{
            padding: "12px 16px",
            borderBottom: `0.5px solid ${WA(0.08)}`,
          }}>
            <p style={{ fontSize: 11, color: M, margin: "0 0 3px" }}>Signed in as</p>
            <p style={{
              fontSize: 13, color: B, fontWeight: 500, margin: 0,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{email}</p>
          </div>

          {/* Menu items */}
          <div style={{ padding: "6px 0" }}>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 16px", fontSize: 13, color: B,
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1.5" stroke={M} strokeWidth="1.2" />
                <rect x="8" y="1" width="5" height="5" rx="1.5" stroke={M} strokeWidth="1.2" />
                <rect x="1" y="8" width="5" height="5" rx="1.5" stroke={M} strokeWidth="1.2" />
                <rect x="8" y="8" width="5" height="5" rx="1.5" stroke={M} strokeWidth="1.2" />
              </svg>
              Dashboard
            </Link>
            <div style={{ height: "0.5px", background: WA(0.07), margin: "4px 0" }} />
            <button
              onClick={signOut}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                width: "100%", padding: "9px 16px", textAlign: "left",
                fontSize: 13, color: "#C0392B",
                background: "none", border: "none", cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2H2.5C2.22 2 2 2.22 2 2.5v9c0 .28.22.5.5.5H5" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M9 10l3-3-3-3M12 7H5.5" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
