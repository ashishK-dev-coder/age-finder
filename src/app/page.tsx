"use client";

import React, { useState, useRef, useMemo } from "react";
import DateSegmentInput from "@/components/DateSegmentInput";
import { calculateAge } from "@/utils/dateCalculations";
import { RotateCcw, Calendar, AlertCircle } from "lucide-react";

export default function HomePage() {
  const [day, setDay] = useState("12");
  const [month, setMonth] = useState("06");
  const [year, setYear] = useState("2001");
  const [separator, setSeparator] = useState<"/" | "-">("/");

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setDay("");
    setMonth("");
    setYear("");
    dayRef.current?.focus();
  };

  const ageData = useMemo(() => {
    if (!day || !month || !year || year.length !== 4) return null;
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
    return calculateAge(d, m, y);
  }, [day, month, year]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-950 selection:bg-indigo-500 selection:text-white">
      {/* Background soft glow */}
      <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
      <div className="absolute w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

      <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" /> Age Calculator
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Age Finder
          </h1>
          <p className="text-xs text-slate-400">
            Type date with auto-jump or paste (e.g. 12/06/2001 or 12-06-2001)
          </p>
        </div>

        {/* 1. Date Input Section */}
        <div>
          <DateSegmentInput
            day={day}
            month={month}
            year={year}
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
            dayRef={dayRef}
            monthRef={monthRef}
            yearRef={yearRef}
            separator={separator}
            setSeparator={setSeparator}
          />
        </div>

        {/* 2. Clear Button In The Middle */}
        <div className="flex items-center justify-center pt-2 pb-1">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/80 hover:bg-rose-950/40 border border-slate-700/60 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* 3. Direct Age Show */}
        <div className="pt-2 border-t border-slate-800/80">
          {ageData && ageData.isValid ? (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Your Exact Age
                </span>
                <div className="text-xl sm:text-2xl font-bold text-indigo-300 mt-1">
                  {ageData.years} Years, {ageData.months} Months, {ageData.days} Days
                </div>
              </div>

              {/* 3 Direct Age Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                    {ageData.years}
                  </div>
                  <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mt-1">
                    Years
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                    {ageData.months}
                  </div>
                  <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mt-1">
                    Months
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-pink-500/30 rounded-2xl p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                    {ageData.days}
                  </div>
                  <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider mt-1">
                    Days
                  </div>
                </div>
              </div>

              {/* Summary line */}
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl px-4 py-2.5 text-center text-xs text-slate-400">
                Total lived: <span className="font-mono text-white font-semibold">{ageData.totalDays.toLocaleString()}</span> days
                {" • "}
                Born on a <span className="text-indigo-300 font-medium">{ageData.dayOfWeekBorn}</span>
              </div>
            </div>
          ) : ageData?.errorMessage ? (
            <div className="flex items-center justify-center gap-2 text-rose-400 text-xs bg-rose-950/40 border border-rose-800/60 px-4 py-3 rounded-xl text-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{ageData.errorMessage}</span>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 text-sm">
              Enter your date of birth above to see your age directly.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
