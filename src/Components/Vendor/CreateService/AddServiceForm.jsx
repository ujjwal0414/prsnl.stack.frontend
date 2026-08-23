import React, { useState, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  Check,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from "@tanstack/react-query";
import { createVendorService } from "../../../api/service/createService";
/**
 * CreateService
 * ------------------------------------------------------------------
 * Matches the ToolBox dashboard shell: sage-mint background, dark
 * teal-navy for active/primary surfaces, muted teal for secondary
 * actions, rounded-2xl cards, outline icons. Built to sit in the
 * content area next to the existing sidebar.
 * ------------------------------------------------------------------
 */

const CATEGORIES = ["Healthcare", "Tech", "Home Services", "Freelance", "Wellness", "Other"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TABS = [
  { id: "details", label: "Details", icon: Briefcase },
  { id: "location", label: "Location", icon: MapPin },
  { id: "availability", label: "Availability", icon: Clock },
  { id: "review", label: "Review", icon: Check },
];

const emptySlot = () => ({ startTime: "09:00", endTime: "17:00" });

export  function AddServiceForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    pricePerHour: "",
    address: { line1: "", city: "", state: "", zip: "" },
    availability: DAYS.map((day) => ({ day, isClosed: day === "Sun", slots: [emptySlot()] })),
  });

  const completion = useMemo(() => {
    let done = 0;
    if (form.category && form.title && form.pricePerHour) done++;
    if (form.address.line1 && form.address.city && form.address.state && form.address.zip) done++;
    if (form.availability.some((d) => !d.isClosed)) done++;
    return done;
  }, [form]);

  const update = (path, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const toggleClosed = (i) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      next.availability[i].isClosed = !next.availability[i].isClosed;
      return next;
    });
  };

  const updateSlot = (dayIdx, slotIdx, field, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      next.availability[dayIdx].slots[slotIdx][field] = value;
      return next;
    });
  };

  const addSlot = (dayIdx) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      next.availability[dayIdx].slots.push(emptySlot());
      return next;
    });
  };

  const removeSlot = (dayIdx, slotIdx) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      next.availability[dayIdx].slots.splice(slotIdx, 1);
      return next;
    });
  };
  const {mutate:createServiceMutation,data:successData,isSuccess,isPending,isError,error} = useMutation({
    mutationFn:createVendorService,
    mutationKey:["createVendorService"],
    onSuccess:((data)=>{


    })
  })

  const handleSubmit = () => {
    const serviceData = {uid:uuidv4(),...form};
    
    console.log(serviceData);
    createServiceMutation(serviceData)
  };

  return (
    <div
      className="min-h-screen lg:h-screen lg:overflow-y-auto w-full bg-[#] px-[3vw] py-[4vh]"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui" }}
    >
      <style>{`
        .heading-font { font-family: 'Poppins', ui-sans-serif, system-ui; }
        input[type="time"]::-webkit-calendar-picker-indicator { opacity: 0.6; }
      `}</style>

      <div className="lg:w-[90%] w-[95&] mx-auto">
        {/* ── Page header ─────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-[3.2vh] flex-wrap gap-[1.4vh]">
          <div>
            <p className="text-[#5C8B93] text-[clamp(11px,0.85vw,13px)] font-semibold tracking-[0.08em] uppercase flex items-center gap-[0.4vw]">
              <Sparkles size={14} strokeWidth={2.5} />
              Vendor Space
            </p>
            <h1 className="heading-font text-[#1F2D2A] text-[clamp(22px,2.1vw,30px)] font-bold mt-[0.4vh]">
              Create Service
            </h1>
            <p className="text-[#6B7B75] text-[clamp(12px,0.9vw,14px)] mt-[0.4vh]">
              Add a new offering clients can discover and book.
            </p>
          </div>

          {/* progress pill */}
          <div className="bg-white rounded-2xl px-[1.4vw] py-[1.2vh] shadow-[0_0.4vh_1.2vh_rgba(31,45,42,0.06)] border border-[#D8E1DB] flex items-center gap-[0.8vw]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-[1.1vh] h-[1.1vh] rounded-full ${
                  i < completion ? "bg-[#20343A]" : "bg-[#D8E1DB]"
                }`}
              />
            ))}
            <span className="text-[#6B7B75] text-[clamp(11px,0.8vw,12px)] font-medium ml-[0.3vw]">
              {completion}/3 sections complete
            </span>
          </div>
        </div>

        {/* ── Tab pills, styled like the sidebar's active nav item ─ */}
        <div className="flex gap-[0.8vw] mb-[2.6vh] flex-wrap">
          {TABS.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-[0.6vw] px-[1.4vw] py-[1.3vh] rounded-xl text-[clamp(12px,0.9vw,14px)] font-semibold transition-colors ${
                  isActive
                    ? "bg-[#20343A] text-[#EAF1EC]"
                    : "bg-white text-[#3E4F4A] border border-[#D8E1DB] hover:border-[#5C8B93]"
                }`}
              >
                <Icon size={16} strokeWidth={2.2} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Card body ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[#D8E1DB] shadow-[0_0.6vh_2vh_rgba(31,45,42,0.06)] p-[3.2vh_2.6vw]">
          {!submitted ? (
            <>
              {TABS[activeTab].id === "details" && (
                <div className="space-y-[2.4vh]">
                  <SectionTitle icon={Briefcase} title="What are you offering?" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6vw]">
                    <Field label="Category">
                      <select
                        value={form.category}
                        onChange={(e) => update("category", e.target.value)}
                        className="input"
                      >
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Price per hour">
                      <div className="relative">
                        <IndianRupee
                          size={15}
                          className="absolute left-[0.9vw] top-1/2 -translate-y-1/2 text-[#8CA39C]"
                        />
                        <input
                          type="number"
                          min="0"
                          value={form.pricePerHour}
                          onChange={(e) => update("pricePerHour", e.target.value)}
                          placeholder="500"
                          className="input pl-[2.4vw]!"
                        />
                      </div>
                    </Field>
                  </div>
                  <Field label="Service title">
                    <input
                      value={form.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="e.g. General Physician Consultation"
                      className="input"
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Tell clients what this service covers, what to expect, and anything they should prepare."
                      className="input resize-none"
                    />
                  </Field>
                </div>
              )}

              {TABS[activeTab].id === "location" && (
                <div className="space-y-[2.4vh]">
                  <SectionTitle icon={MapPin} title="Where is this service based?" />
                  <Field label="Address line">
                    <input
                      value={form.address.line1}
                      onChange={(e) => update("address.line1", e.target.value)}
                      placeholder="Street, building, area"
                      className="input"
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.6vw]">
                    <Field label="City">
                      <input
                        value={form.address.city}
                        onChange={(e) => update("address.city", e.target.value)}
                        className="input"
                      />
                    </Field>
                    <Field label="State">
                      <input
                        value={form.address.state}
                        onChange={(e) => update("address.state", e.target.value)}
                        className="input"
                      />
                    </Field>
                    <Field label="ZIP code">
                      <input
                        value={form.address.zip}
                        onChange={(e) => update("address.zip", e.target.value)}
                        className="input"
                      />
                    </Field>
                  </div>
                </div>
              )}

              {TABS[activeTab].id === "availability" && (
                <div className="space-y-[2.4vh]">
                  <SectionTitle icon={Clock} title="When are you available?" />
                  <div className="space-y-[1.4vh]">
                    {form.availability.map((d, di) => (
                      <div
                        key={d.day}
                        className={`flex flex-wrap items-center gap-[1vw] rounded-xl px-[1.2vw] py-[1.4vh] border ${
                          d.isClosed ? "bg-[#F3F5F3] border-[#E4E9E5]" : "bg-[#F8FAF8] border-[#D8E1DB]"
                        }`}
                      >
                        <span className="heading-font w-[4.2vw] min-w-10.5 text-[#1F2D2A] text-[clamp(12px,0.9vw,14px)] font-semibold">
                          {d.day}
                        </span>
                        <button
                          onClick={() => toggleClosed(di)}
                          className={`text-[clamp(11px,0.8vw,12px)] font-medium px-[0.9vw] py-[0.6vh] rounded-lg border ${
                            d.isClosed
                              ? "bg-white text-[#6B7B75] border-[#D8E1DB]"
                              : "bg-[#20343A] text-white border-[#20343A]"
                          }`}
                        >
                          {d.isClosed ? "Closed" : "Open"}
                        </button>

                        {!d.isClosed && (
                          <div className="flex items-center gap-[0.8vw] flex-wrap">
                            {d.slots.map((slot, si) => (
                              <div key={si} className="flex items-center gap-[0.4vw] bg-white rounded-lg border border-[#D8E1DB] px-[0.6vw] py-[0.5vh]">
                                <input
                                  type="time"
                                  value={slot.startTime}
                                  onChange={(e) => updateSlot(di, si, "startTime", e.target.value)}
                                  className="bg-transparent text-[clamp(11px,0.8vw,13px)] text-[#1F2D2A] outline-none"
                                />
                                <span className="text-[#8CA39C]">–</span>
                                <input
                                  type="time"
                                  value={slot.endTime}
                                  onChange={(e) => updateSlot(di, si, "endTime", e.target.value)}
                                  className="bg-transparent text-[clamp(11px,0.8vw,13px)] text-[#1F2D2A] outline-none"
                                />
                                {d.slots.length > 1 && (
                                  <button onClick={() => removeSlot(di, si)} className="text-[#B9C4BF] hover:text-[#A23B2E]">
                                    <X size={13} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={() => addSlot(di)}
                              className="flex items-center gap-[0.3vw] text-[#5C8B93] text-[clamp(11px,0.8vw,12px)] font-semibold hover:text-[#20343A]"
                            >
                              <Plus size={13} /> Add slot
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {TABS[activeTab].id === "review" && (
                <div className="space-y-[2.4vh]">
                  <SectionTitle icon={Check} title="Review before publishing" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.4vw]">
                    <SummaryCard label="Category" value={form.category || "Not set"} />
                    <SummaryCard label="Rate" value={form.pricePerHour ? `₹${form.pricePerHour} / hr` : "Not set"} />
                    <SummaryCard label="Title" value={form.title || "Not set"} />
                    <SummaryCard label="City" value={form.address.city || "Not set"} />
                    <SummaryCard
                      label="Open days"
                      value={`${form.availability.filter((d) => !d.isClosed).length} of 7`}
                    />
                    <SummaryCard label="Address" value={form.address.line1 || "Not set"} />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="heading-font w-full sm:w-auto flex items-center justify-center gap-[0.6vw] bg-[#20343A] hover:bg-[#182A2E] text-white px-[2.4vw] py-[1.6vh] rounded-xl text-[clamp(13px,0.95vw,15px)] font-semibold transition-colors"
                  >
                    <Check size={17} strokeWidth={2.5} />
                    Publish Service
                  </button>
                </div>
              )}

              {/* Bottom nav */}
              {TABS[activeTab].id !== "review" && (
                <div className="flex justify-between items-center mt-[3.2vh] pt-[2.2vh] border-t border-[#E4E9E5]">
                  <button
                    onClick={() => setActiveTab((t) => Math.max(0, t - 1))}
                    disabled={activeTab === 0}
                    className="flex items-center gap-[0.3vw] text-[#6B7B75] text-[clamp(12px,0.85vw,13px)] font-medium disabled:opacity-0"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => setActiveTab((t) => Math.min(TABS.length - 1, t + 1))}
                    className="flex items-center gap-[0.4vw] bg-[#5C8B93] hover:bg-[#4C7A82] text-white px-[1.6vw] py-[1.2vh] rounded-xl text-[clamp(12px,0.85vw,13px)] font-semibold transition-colors"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-[4vh]">
              <div className="w-[7vh] h-[7vh] rounded-full bg-[#E5EFE8] flex items-center justify-center mx-auto mb-[2vh]">
                <Check size={28} className="text-[#20343A]" strokeWidth={2.5} />
              </div>
              <h2 className="heading-font text-[#1F2D2A] text-[clamp(18px,1.6vw,22px)] font-bold">
                Service published
              </h2>
              <p className="text-[#6B7B75] text-[clamp(12px,0.9vw,14px)] mt-[0.8vh]">
                {form.title} is now live under {form.category}.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: #FBFCFB;
          border: 0.12vh solid #D8E1DB;
          border-radius: 0.7vh;
          padding: 1.2vh 1vw;
          font-size: clamp(13px, 0.9vw, 14px);
          color: #1F2D2A;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .input:focus {
          border-color: #5C8B93;
          background: #FFFFFF;
        }
        .input::placeholder {
          color: #A6B3AE;
        }
      `}</style>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-[0.7vw] mb-[0.4vh]">
      <span className="w-[3.6vh] h-[3.6vh] rounded-lg bg-[#EAF1EC] flex items-center justify-center text-[#20343A]">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <h2 className="heading-font text-[#1F2D2A] text-[clamp(15px,1.1vw,18px)] font-semibold">
        {title}
      </h2>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[#3E4F4A] text-[clamp(11px,0.82vw,13px)] font-medium mb-[0.7vh]">
        {label}
      </span>
      {children}
    </label>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="bg-[#F8FAF8] border border-[#E4E9E5] rounded-xl px-[1.2vw] py-[1.4vh]">
      <p className="text-[#6B7B75] text-[clamp(10px,0.75vw,11px)] font-medium uppercase tracking-[0.06em]">
        {label}
      </p>
      <p className="text-[#1F2D2A] text-[clamp(13px,0.95vw,15px)] font-semibold mt-[0.4vh] truncate">
        {value}
      </p>
    </div>
  );
}