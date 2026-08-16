import React, { useState, useMemo } from "react";

/**
 * AddServiceForm
 * ------------------------------------------------------------------
 * Ticket / work-order themed form for a vendor to file a new service
 * (matches the `serviceSchema` sub-document: category, title, address,
 * geo location, weekly availability, and price per hour).
 *
 * Sizing intentionally uses vw/vh so the ticket scales with the
 * viewport rather than snapping at fixed breakpoints. Font sizes are
 * clamped so they stay legible at extreme widths.
 * ------------------------------------------------------------------
 */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CATEGORIES = ["Healthcare", "Tech", "Home Services", "Freelance", "Wellness", "Other"];

const STEPS = [
  { id: "details", label: "Service Details" },
  { id: "location", label: "Location" },
  { id: "availability", label: "Availability" },
  { id: "review", label: "File Ticket" },
];

const emptySlot = () => ({ startTime: "09:00", endTime: "17:00" });

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export  function AddServiceForm({ onSubmit }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    address: { line1: "", city: "", state: "", zip: "" },
    pricePerHour: "",
    availability: DAYS.map((day) => ({ day, isClosed: false, slots: [emptySlot()] })),
  });

  const ticketNumber = useMemo(
    () => `SVC-${Math.floor(100000 + Math.random() * 899999)}`,
    []
  );

  const step = STEPS[stepIndex];

  const updateField = (path, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      let ref = next;
      const keys = path.split(".");
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const toggleClosed = (dayIndex) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      next.availability[dayIndex].isClosed = !next.availability[dayIndex].isClosed;
      return next;
    });
  };

  const updateSlot = (dayIndex, slotIndex, field, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      next.availability[dayIndex].slots[slotIndex][field] = value;
      return next;
    });
  };

  const addSlot = (dayIndex) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      next.availability[dayIndex].slots.push(emptySlot());
      return next;
    });
  };

  const canAdvance = () => {
    if (step.id === "details") return form.category && form.title.trim() && form.pricePerHour;
    if (step.id === "location")
      return form.address.line1 && form.address.city && form.address.state && form.address.zip;
    return true;
  };

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1);
  };
  const goBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleFile = () => {
    const payload = {
      ...form,
      pricePerHour: Number(form.pricePerHour),
      availability: form.availability.map((d) => ({
        ...d,
        slots: d.isClosed
          ? []
          : d.slots.map((s) => ({ startTime: toMinutes(s.startTime), endTime: toMinutes(s.endTime) })),
      })),
    };
    setSubmitted(true);
    onSubmit?.(payload);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#ECEAE2] py-[4vh] px-[3vw]"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
        .ticket-font { font-family: 'Space Mono', monospace; }
        .stub-hole {
          background: radial-gradient(circle, transparent 0, transparent 60%, #ECEAE2 61%);
        }
      `}</style>

      <div
        className="relative w-full max-w-[92vw] lg:max-w-[74vw] bg-[#F5F3EC] shadow-[0_1.5vh_3vh_rgba(36,38,43,0.18)] flex flex-col lg:flex-row"
        style={{ border: "0.15vh solid #24262B" }}
      >
        {/* ── Left: numbered steps + active form ─────────────────── */}
        <div className="flex-1 p-[3.5vh_3.5vw] lg:p-[4vh_3vw]">
          <div className="flex items-baseline justify-between mb-[3vh] border-b border-[#B9B4A8] pb-[2vh]">
            <div>
              <p className="ticket-font text-[#A23B2E] text-[clamp(11px,1vw,13px)] tracking-[0.25em] uppercase">
                Vendor Work Order
              </p>
              <h1 className="text-[#24262B] font-semibold text-[clamp(20px,2.4vw,32px)] leading-tight mt-[0.5vh]">
                File a New Service
              </h1>
            </div>
            <p className="ticket-font text-[#24262B]/60 text-[clamp(10px,0.9vw,13px)]">
              {ticketNumber}
            </p>
          </div>

          {/* Step rail — numbered because these are literal sequential stages */}
          <ol className="flex flex-wrap gap-x-[2vw] gap-y-[1vh] mb-[3.5vh]">
            {STEPS.map((s, i) => (
              <li key={s.id} className="flex items-center gap-[0.6vw]">
                <span
                  className={`ticket-font flex items-center justify-center w-[3.6vh] h-[3.6vh] text-[clamp(11px,0.9vw,13px)] rounded-full border ${
                    i === stepIndex
                      ? "bg-[#A23B2E] text-[#F5F3EC] border-[#A23B2E]"
                      : i < stepIndex
                      ? "bg-[#3F6B4E] text-[#F5F3EC] border-[#3F6B4E]"
                      : "text-[#24262B]/50 border-[#B9B4A8]"
                  }`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </span>
                <span
                  className={`text-[clamp(11px,0.85vw,14px)] ${
                    i === stepIndex ? "text-[#24262B] font-semibold" : "text-[#24262B]/50"
                  }`}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ol>

          {!submitted ? (
            <>
              {step.id === "details" && (
                <div className="space-y-[2.2vh]">
                  <Field label="Category">
                    <select
                      value={form.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="ticket-input"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Service Title">
                    <input
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="e.g. General Physician Consultation"
                      className="ticket-input"
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      value={form.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      rows={3}
                      placeholder="What does this service cover?"
                      className="ticket-input resize-none"
                    />
                  </Field>
                  <Field label="Price per Hour (₹)">
                    <input
                      type="number"
                      min="0"
                      value={form.pricePerHour}
                      onChange={(e) => updateField("pricePerHour", e.target.value)}
                      placeholder="500"
                      className="ticket-input"
                    />
                  </Field>
                </div>
              )}

              {step.id === "location" && (
                <div className="space-y-[2.2vh]">
                  <Field label="Address Line">
                    <input
                      value={form.address.line1}
                      onChange={(e) => updateField("address.line1", e.target.value)}
                      className="ticket-input"
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.5vw]">
                    <Field label="City">
                      <input
                        value={form.address.city}
                        onChange={(e) => updateField("address.city", e.target.value)}
                        className="ticket-input"
                      />
                    </Field>
                    <Field label="State">
                      <input
                        value={form.address.state}
                        onChange={(e) => updateField("address.state", e.target.value)}
                        className="ticket-input"
                      />
                    </Field>
                    <Field label="ZIP">
                      <input
                        value={form.address.zip}
                        onChange={(e) => updateField("address.zip", e.target.value)}
                        className="ticket-input"
                      />
                    </Field>
                  </div>
                </div>
              )}

              {step.id === "availability" && (
                <div className="space-y-[1.6vh]">
                  {form.availability.map((d, di) => (
                    <div key={d.day} className="flex flex-wrap items-center gap-[1vw] border-b border-[#B9B4A8]/60 pb-[1.4vh]">
                      <span className="ticket-font w-[5vw] min-w-10.5 text-[#24262B] text-[clamp(11px,0.9vw,13px)]">
                        {d.day}
                      </span>
                      <label className="flex items-center gap-[0.5vw] text-[clamp(11px,0.85vw,13px)] text-[#24262B]/70">
                        <input type="checkbox" checked={d.isClosed} onChange={() => toggleClosed(di)} />
                        Closed
                      </label>
                      {!d.isClosed &&
                        d.slots.map((slot, si) => (
                          <div key={si} className="flex items-center gap-[0.5vw]">
                            <input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateSlot(di, si, "startTime", e.target.value)}
                              className="ticket-input w-[9vw]! min-w-27.5! py-[0.6vh]!"
                            />
                            <span className="text-[#24262B]/50">–</span>
                            <input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateSlot(di, si, "endTime", e.target.value)}
                              className="ticket-input w-[9vw]! min-w-27.5! py-[0.6vh]!"
                            />
                          </div>
                        ))}
                      {!d.isClosed && (
                        <button
                          type="button"
                          onClick={() => addSlot(di)}
                          className="ticket-font text-[#3F6B4E] text-[clamp(10px,0.8vw,12px)] hover:underline"
                        >
                          + slot
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {step.id === "review" && (
                <div className="space-y-[1.4vh] text-[#24262B]">
                  <p className="text-[clamp(12px,0.95vw,14px)] text-[#24262B]/70">
                    Confirm the details on the stub, then file the ticket.
                  </p>
                  <button
                    onClick={handleFile}
                    className="ticket-font bg-[#A23B2E] text-[#F5F3EC] px-[2.2vw] py-[1.4vh] text-[clamp(12px,0.95vw,14px)] tracking-widest uppercase hover:opacity-90 transition"
                  >
                    Stamp &amp; File Ticket
                  </button>
                </div>
              )}

              {/* Nav */}
              <div className="flex justify-between mt-[3.5vh] pt-[2vh] border-t border-[#B9B4A8]">
                <button
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  className="ticket-font text-[clamp(11px,0.85vw,13px)] uppercase tracking-wide text-[#24262B]/60 disabled:opacity-0"
                >
                  ← Back
                </button>
                {step.id !== "review" && (
                  <button
                    onClick={goNext}
                    disabled={!canAdvance()}
                    className="ticket-font text-[clamp(11px,0.85vw,13px)] uppercase tracking-wide text-[#F5F3EC] bg-[#24262B] px-[1.8vw] py-[1.1vh] disabled:opacity-30"
                  >
                    Next →
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="py-[4vh]">
              <p className="ticket-font text-[#3F6B4E] text-[clamp(13px,1vw,16px)] tracking-widest uppercase">
                ✓ Ticket Filed
              </p>
              <p className="text-[#24262B]/70 text-[clamp(12px,0.95vw,14px)] mt-[1vh]">
                {form.title} is now listed under {form.category}.
              </p>
            </div>
          )}
        </div>

        {/* ── Right: perforated ticket stub summary ──────────────── */}
        <div
          className="lg:w-[26vw] bg-[#24262B] text-[#F5F3EC] p-[3.5vh_3vw] flex flex-col justify-between relative"
          style={{ borderLeft: "0.15vh dashed #B9B4A8" }}
        >
          <div className="hidden lg:flex flex-col gap-[1.4vh] absolute left-[-0.9vh] top-0 bottom-0 justify-around">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="stub-hole w-[1.8vh] h-[1.8vh] rounded-full bg-[#24262B]" />
            ))}
          </div>

          <div>
            <p className="ticket-font text-[clamp(10px,0.8vw,12px)] tracking-[0.3em] text-[#B9B4A8] uppercase">
              Stub
            </p>
            <p className="ticket-font text-[clamp(14px,1.1vw,18px)] mt-[0.6vh]">{ticketNumber}</p>

            <div className="mt-[3vh] space-y-[1.8vh]">
              <StubRow label="Category" value={form.category || "—"} />
              <StubRow label="Title" value={form.title || "—"} />
              <StubRow label="Rate" value={form.pricePerHour ? `₹${form.pricePerHour}/hr` : "—"} />
              <StubRow label="City" value={form.address.city || "—"} />
              <StubRow
                label="Open Days"
                value={form.availability.filter((d) => !d.isClosed).length + " / 7"}
              />
            </div>
          </div>

          <p className="ticket-font text-[clamp(9px,0.75vw,11px)] text-[#B9B4A8] mt-[3vh]">
            Retain this stub for your records.
          </p>
        </div>
      </div>

      <style>{`
        .ticket-input {
          width: 100%;
          background: #FFFFFF;
          border: 0.12vh solid #B9B4A8;
          padding: 1.2vh 1vw;
          font-size: clamp(13px, 0.95vw, 15px);
          color: #24262B;
          outline: none;
        }
        .ticket-input:focus {
          border-color: #A23B2E;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="ticket-font block text-[clamp(10px,0.8vw,12px)] tracking-[0.15em] uppercase text-[#24262B]/60 mb-[0.8vh]">
        {label}
      </span>
      {children}
    </label>
  );
}

function StubRow({ label, value }) {
  return (
    <div>
      <p className="ticket-font text-[clamp(9px,0.75vw,11px)] tracking-[0.2em] uppercase text-[#B9B4A8]">
        {label}
      </p>
      <p className="text-[clamp(13px,1vw,16px)] mt-[0.3vh]">{value}</p>
    </div>
  );
}
