"use client";

import { useEffect, useState } from "react";
import {
  getCurrentUser,
  fetchAdminSettings,
  updateSiteSettings,
} from "@/lib/admin-api";

export default function SettingsPage() {
  const user = getCurrentUser();
  const [deadline, setDeadline] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const rows = await fetchAdminSettings();
      for (const row of rows) {
        if (row.key === "registrationDeadline") setDeadline(row.value);
        if (row.key === "totalPrizePool") setPrizePool(row.value);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateSiteSettings({
        registrationDeadline: deadline.trim(),
        totalPrizePool: prizePool.trim(),
      });
      setSuccess("Site settings updated successfully.");
      loadSettings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold tracking-[0.2em] text-white uppercase">
          // Settings
        </h1>
        <p className="mt-2 font-mono text-[11px] text-white uppercase tracking-[0.2em]">
          Site-wide values shown across the homepage
        </p>
      </div>

      {error && (
        <div className="mb-4 border border-red-500/50 bg-red-500/10 p-3 rounded">
          <p className="font-mono text-xs text-red-400">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 border border-green-500/50 bg-green-500/10 p-3 rounded">
          <p className="font-mono text-xs text-green-400">{success}</p>
        </div>
      )}

      {loading ? (
        <div className="border border-white/10 bg-black/40 p-4 rounded animate-pulse">
          <div className="h-4 bg-white/10 rounded w-1/2 mb-2" />
          <div className="h-3 bg-white/10 rounded w-1/3" />
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="border border-white/10 bg-black/40 p-6 rounded max-w-2xl space-y-4"
        >
          <div>
            <label className="field-label" htmlFor="set-deadline">
              Registration deadline
            </label>
            <input
              id="set-deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              placeholder="2026-10-23T00:00:00+05:30"
              className="field-control"
            />
            <p className="mt-1 font-mono text-[10px] text-white">
              ISO date with timezone — drives the homepage countdown.
            </p>
          </div>

          <div>
            <label className="field-label" htmlFor="set-prize">
              Total prize pool
            </label>
            <input
              id="set-prize"
              value={prizePool}
              onChange={(e) => setPrizePool(e.target.value)}
              required
              placeholder="₹4,85,000"
              className="field-control"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-red-600 px-6 py-2.5 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-red-500 disabled:opacity-50 transition-colors"
          >
            {saving ? "SAVING..." : "SAVE SETTINGS >"}
          </button>
        </form>
      )}
    </div>
  );
}
