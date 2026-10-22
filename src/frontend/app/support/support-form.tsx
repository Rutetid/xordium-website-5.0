"use client";

import { useState } from "react";
import {
  CheckCircle,
  Send,
  Copy,
  Check,
  MessageSquare,
  Mail,
  ExternalLink,
} from "lucide-react";

const CHANNELS = [
  {
    id: "Official Email",
    node: "NODE-01",
    label: "Official email",
    icon: Mail,
    value: "ignite@bitmesra.ac.in",
    href: "mailto:ignite@bitmesra.ac.in",
    note: "Saved to the admin inbox • email notification when configured",
    copy: "support@xordium.igniteclub.tech",
  },
  {
    id: "WhatsApp",
    node: "NODE-02",
    label: "WhatsApp community",
    icon: MessageSquare,
    value: "Xordium 5.0",
    href: "https://chat.whatsapp.com/KcL7hlFXZCw78nP3hWkza0",
    note: "Event updates and FAQs directly from coordinators",
  },
  {
    id: "Instagram",
    node: "NODE-03",
    label: "Instagram",
    icon: ExternalLink,
    value: "@ignite_bitp",
    href: "https://instagram.com/ignite_bitp",
    note: "Highlights, tournament stories and match announcements",
  },
];

export function SupportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDispatch, setSubmittedDispatch] = useState<{
    dispatchId: string;
    notificationSent: boolean;
  } | null>(null);
  const [failed, setFailed] = useState(false);
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFailed(false);

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: {
        success?: boolean;
        error?: string;
        dispatchId?: string;
        notificationSent?: boolean;
      } = await response.json();

      if (response.ok && result.success) {
        setSubmittedDispatch({
          dispatchId: result.dispatchId ?? "",
          notificationSent: result.notificationSent === true,
        });
        setFormData({ name: "", email: "", topic: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to dispatch message");
      }
    } catch (err: unknown) {
      console.error(
        "Support message submission failed:",
        err instanceof Error ? err.name : "Unknown error",
      );
      setFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChannel(label);
    setTimeout(() => setCopiedChannel(null), 2000);
  };

  return (
    <div className="cx-sup-grid">
      {/* ── Touchpoint nodes ─────────────────────────────────── */}
      <aside className="cx-panel cx-corners cx-sup-side">
        <div className="cx-scan" aria-hidden="true" />
        <header className="cx-sup-head-row">
          <p className="cx-sup-head">
            <span className="cx-live-dot" aria-hidden="true" />
            Touchpoint nodes
          </p>
          <span className="cx-sup-head-meta">DIR // 03 LINKED</span>
        </header>

        <div className="cx-sup-channels">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            return (
              <div key={ch.id} className="cx-sup-ch">
                <div className="cx-sup-ch-row">
                  <span className="cx-sup-ch-label">
                    <span className="cx-live-dot" aria-hidden="true" />
                    <span className="cx-sup-ch-node">{ch.node}</span>
                    <Icon aria-hidden="true" className="cx-sup-ch-icon" />
                    {ch.label}
                  </span>
                  {ch.copy ? (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(ch.copy!, ch.id)}
                      className="cx-sup-ch-copy"
                    >
                      {copiedChannel === ch.id ? (
                        <Check aria-hidden="true" className="cx-sup-ch-icon" />
                      ) : (
                        <Copy aria-hidden="true" className="cx-sup-ch-icon" />
                      )}
                      {copiedChannel === ch.id ? "Copied" : "Copy"}
                    </button>
                  ) : null}
                </div>
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="cx-sup-ch-value"
                >
                  {ch.value}
                </a>
                <span className="cx-sup-ch-note">{ch.note}</span>
                <span className="cx-sup-ch-status">
                  ▸ status: linked · latency 12ms
                </span>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ── Dispatch terminal ───────────────────────────────── */}
      <section className="cx-panel cx-corners cx-sup-term">
        <div className="cx-scan" aria-hidden="true" />

        {/* window chrome */}
        <div className="cx-sup-chrome">
          <span className="cx-sup-chrome-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cx-sup-chrome-title">
            dispatch.exe // terminal-04
          </span>
          <span className="cx-sup-chrome-live">
            <span className="cx-live-dot cx-live-dot--red" aria-hidden="true" />
            TX LIVE
          </span>
        </div>

        <div className="cx-sup-term-body">
          <p className="cx-sup-boot" aria-hidden="true">
            <span className="cx-sup-boot-line">
              &gt; secure channel established — awaiting payload
            </span>
            <span className="cx-sup-caret">▌</span>
          </p>

          <form onSubmit={handleSubmit} className="cx-sup-form">
            <div className="cx-sup-field">
              <label className="cx-sup-label" htmlFor="sup-name">
                <span className="cx-sup-idx">[01]</span> Name
                <span className="text-red-500">*</span>
                <span className="cx-sup-label-hint">student / gamer tag</span>
              </label>
              <div className="cx-sup-wrap">
                <span className="cx-sup-prompt" aria-hidden="true">
                  &gt;
                </span>
                <input
                  id="sup-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="enter your name"
                  className="cx-input cx-sup-in"
                />
              </div>
            </div>

            <div className="cx-sup-field">
              <label className="cx-sup-label" htmlFor="sup-email">
                <span className="cx-sup-idx">[02]</span> Email
                <span className="text-red-500">*</span>
              </label>
              <div className="cx-sup-wrap">
                <span className="cx-sup-prompt" aria-hidden="true">
                  &gt;
                </span>
                <input
                  id="sup-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@example.com"
                  className="cx-input cx-sup-in"
                />
              </div>
            </div>

            <div className="cx-sup-field">
              <label className="cx-sup-label" htmlFor="sup-topic">
                <span className="cx-sup-idx">[03]</span> Inquiry topic
                <span className="text-red-500">*</span>
              </label>
              <div className="cx-sup-wrap cx-sup-wrap--select">
                <span className="cx-sup-prompt" aria-hidden="true">
                  &gt;
                </span>
                <select
                  id="sup-topic"
                  required
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="cx-input cx-sup-in cx-sup-select"
                >
                  <option value="" disabled>
                    select an inquiry topic…
                  </option>
                  <option value="registration">
                    registration / team registration query
                  </option>
                  <option value="technical">technical issue / bug report</option>
                  <option value="general">general question</option>
                </select>
              </div>
            </div>

            <div className="cx-sup-field">
              <label className="cx-sup-label" htmlFor="sup-message">
                <span className="cx-sup-idx">[04]</span> Message body
                <span className="text-red-500">*</span>
              </label>
              <div className="cx-sup-wrap cx-sup-wrap--area">
                <span className="cx-sup-prompt" aria-hidden="true">
                  &gt;
                </span>
                <textarea
                  id="sup-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="query, bracket dispute details, or technical issue description…"
                  className="cx-input cx-sup-in cx-sup-textarea"
                />
              </div>
            </div>

            <div className="cx-sup-submit-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cx-sup-transmit"
              >
                <span className="cx-sup-transmit-stripes" aria-hidden="true" />
                <span className="cx-sup-transmit-label">
                  {isSubmitting ? (
                    "Transmitting…"
                  ) : (
                    <>
                      <Send aria-hidden="true" /> Transmit packet →
                    </>
                  )}
                </span>
              </button>
            </div>

            {failed ? (
              <div className="cx-sup-alert cx-sup-alert--fail" role="alert">
                <p className="cx-sup-alert-head">
                  <span
                    className="cx-live-dot cx-live-dot--red"
                    aria-hidden="true"
                  />
                  Err // dispatch failed
                </p>
                <p className="cx-sup-alert-body">
                  The uplink rejected the packet — retry, or open a touchpoint
                  node from the directory.
                </p>
              </div>
            ) : null}

            {submittedDispatch ? (
              <div className="cx-sup-alert" role="status">
                <p className="cx-sup-alert-head">
                  <CheckCircle aria-hidden="true" className="cx-sup-ch-icon" />
                  {submittedDispatch.notificationSent
                    ? "Dispatch sent to committee arbiters"
                    : "Message received"}
                </p>
                <p className="cx-sup-alert-body">
                  &gt; ref <strong>{submittedDispatch.dispatchId}</strong> —
                  stand by for reply on your registered channel.
                </p>
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
