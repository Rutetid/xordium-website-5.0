"use client";

import { useEffect, useState } from "react";
import {
  getCurrentUser,
  fetchTimetable,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry,
  type TimetableEntry,
  type TimetableEntryInput,
} from "@/lib/admin-api";

const EMPTY_FORM: TimetableEntryInput = {
  day: "",
  time: "",
  title: "",
  detail: "",
  venue: "",
  mode: "",
  sortOrder: 0,
};

function toForm(entry: TimetableEntry): TimetableEntryInput {
  return {
    day: entry.day,
    time: entry.time,
    title: entry.title,
    detail: entry.detail,
    venue: entry.venue,
    mode: entry.mode,
    sortOrder: entry.sortOrder,
  };
}

export default function TimetablePage() {
  const user = getCurrentUser();
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<TimetableEntryInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const data = await fetchTimetable();
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load timetable");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    const maxOrder = entries.reduce((max, e) => Math.max(max, e.sortOrder), -1);
    setForm({ ...EMPTY_FORM, sortOrder: maxOrder + 1 });
    setEditingId(null);
    setIsCreating(true);
    setSuccess("");
    setError("");
  }

  function openEdit(entry: TimetableEntry) {
    setForm(toForm(entry));
    setEditingId(entry.id);
    setIsCreating(true);
    setSuccess("");
    setError("");
  }

  function closeModal() {
    setIsCreating(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function updateField<K extends keyof TimetableEntryInput>(
    field: K,
    value: TimetableEntryInput[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload: TimetableEntryInput = {
        day: form.day.trim(),
        time: form.time.trim(),
        title: form.title.trim(),
        detail: form.detail.trim(),
        venue: form.venue.trim(),
        mode: form.mode.trim(),
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (editingId) {
        await updateTimetableEntry(editingId, payload);
        setSuccess("Timetable entry updated successfully.");
      } else {
        await createTimetableEntry(payload);
        setSuccess("Timetable entry created successfully.");
      }
      closeModal();
      loadEntries();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save entry.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await deleteTimetableEntry(id);
      setSuccess("Timetable entry deleted successfully.");
      setDeleteConfirm(null);
      loadEntries();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete entry.");
    } finally {
      setDeleting(false);
    }
  }

  if (!user) return null;

  const days = [...new Set(entries.map((e) => e.day))];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold tracking-[0.2em] text-white uppercase">
            // Timetable
          </h1>
          <p className="mt-2 font-mono text-[11px] text-white uppercase tracking-[0.2em]">
            Edit every detail of the festival timetable shown on the homepage
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-red-600 px-6 py-2.5 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-red-500 transition-colors"
        >
          + Add entry
        </button>
      </div>

      {/* Alerts */}
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

      {/* Add / Edit modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="border border-white/20 bg-[#0a0c10] rounded max-w-2xl w-full max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="font-mono text-base font-bold text-white">
                {editingId ? "Edit timetable entry" : "New timetable entry"}
              </h2>
              <button
                onClick={closeModal}
                className="font-mono text-white hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="field-label" htmlFor="tt-day">Day</label>
                <input
                  id="tt-day"
                  value={form.day}
                  onChange={(e) => updateField("day", e.target.value)}
                  required
                  list="tt-day-options"
                  placeholder="Day 01 // Arrival & opening"
                  className="field-control"
                />
                <datalist id="tt-day-options">
                  {days.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="tt-time">Time</label>
                  <input
                    id="tt-time"
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    required
                    placeholder="09:00 – 11:30"
                    className="field-control"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="tt-order">Sort order</label>
                  <input
                    id="tt-order"
                    type="number"
                    min={0}
                    value={form.sortOrder}
                    onChange={(e) => updateField("sortOrder", Number(e.target.value))}
                    className="field-control"
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="tt-title">Title</label>
                <input
                  id="tt-title"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                  placeholder="Registration convergence & hardware verification"
                  className="field-control"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="tt-detail">Detail</label>
                <textarea
                  id="tt-detail"
                  value={form.detail}
                  onChange={(e) => updateField("detail", e.target.value)}
                  required
                  rows={3}
                  placeholder="ID & peripheral inspection, LAN seat assignment."
                  className="field-control"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="tt-venue">Venue</label>
                  <input
                    id="tt-venue"
                    value={form.venue}
                    onChange={(e) => updateField("venue", e.target.value)}
                    required
                    placeholder="Tech Complex Hall A"
                    className="field-control"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="tt-mode">Mode</label>
                  <input
                    id="tt-mode"
                    value={form.mode}
                    onChange={(e) => updateField("mode", e.target.value)}
                    required
                    placeholder="Mandatory"
                    className="field-control"
                  />
                </div>
              </div>

              <div className="flex gap-3 border-t border-white/10 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-red-600 px-6 py-2.5 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-red-500 disabled:opacity-50 transition-colors"
                >
                  {saving ? "SAVING..." : editingId ? "SAVE CHANGES >" : "CREATE ENTRY >"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-white/20 bg-white/5 px-6 py-2.5 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-white/10 hover:text-white transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Entries list */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-white/10 bg-white/5 p-4 rounded animate-pulse"
            >
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="border border-white/10 bg-white/5 p-8 rounded text-center">
          <p className="font-mono text-sm text-white">
            No timetable entries yet. Add the first one.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border border-white/10 bg-white/5 p-4 rounded hover:border-white/20 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                <span className="bg-red-600/20 text-red-400 border border-red-500/50 px-2 py-1 rounded">
                  {entry.day}
                </span>
                <span className="text-cyan-300">{entry.time}</span>
                <span className="text-white">#{entry.sortOrder}</span>
              </div>
              <h3 className="font-mono text-sm font-bold text-white mt-2">
                {entry.title}
              </h3>
              <p className="font-mono text-[11px] text-white mt-1">
                {entry.detail}
              </p>
              <p className="font-mono text-[10px] text-white mt-1">
                {entry.venue} // [{entry.mode}]
              </p>
              <div className="flex items-center gap-2 border-t border-white/10 pt-3 mt-3">
                <button
                  onClick={() => openEdit(entry)}
                  className="bg-white/10 border border-white/20 px-3 py-1.5 font-mono text-[10px] font-bold text-white uppercase tracking-[0.15em] hover:bg-white/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  disabled={deleting}
                  className={`border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                    deleteConfirm === entry.id
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-white/10 border-white/20 text-white hover:bg-red-600/20 hover:border-red-500 hover:text-red-400"
                  }`}
                >
                  {deleteConfirm === entry.id
                    ? deleting
                      ? "DELETING..."
                      : "CONFIRM DELETE"
                    : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
