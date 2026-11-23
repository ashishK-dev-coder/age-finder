"use client";

import React from "react";
import { parseDateString } from "@/utils/dateCalculations";

interface DateSegmentInputProps {
  day: string;
  month: string;
  year: string;
  setDay: (val: string) => void;
  setMonth: (val: string) => void;
  setYear: (val: string) => void;
  dayRef: React.RefObject<HTMLInputElement | null>;
  monthRef: React.RefObject<HTMLInputElement | null>;
  yearRef: React.RefObject<HTMLInputElement | null>;
  separator: "/" | "-";
  setSeparator: (sep: "/" | "-") => void;
}

export default function DateSegmentInput({
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear,
  dayRef,
  monthRef,
  yearRef,
  separator,
  setSeparator,
}: DateSegmentInputProps) {
  const currentYear = new Date().getFullYear();

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDay(val);

    // Auto-jump to month if 2 digits entered or single digit > 3
    if (val.length === 2) {
      monthRef.current?.focus();
      monthRef.current?.select();
    } else if (val.length === 1 && parseInt(val, 10) > 3) {
      setDay(`0${val}`);
      monthRef.current?.focus();
      monthRef.current?.select();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(val);

    // Auto-jump to year if 2 digits entered or single digit > 1
    if (val.length === 2) {
      yearRef.current?.focus();
      yearRef.current?.select();
    } else if (val.length === 1 && parseInt(val, 10) > 1) {
      setMonth(`0${val}`);
      yearRef.current?.focus();
      yearRef.current?.select();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(val);

    if (val.length === 4) {
      yearRef.current?.blur();
    }
  };

  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "/" || e.key === "-" || e.key === "Enter") {
      e.preventDefault();
      if (day.length === 1) setDay(`0${day}`);
      monthRef.current?.focus();
      monthRef.current?.select();
    } else if (e.key === "ArrowRight") {
      const input = dayRef.current;
      if (input && input.selectionStart === day.length) {
        monthRef.current?.focus();
      }
    }
  };

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "/" || e.key === "-" || e.key === "Enter") {
      e.preventDefault();
      if (month.length === 1) setMonth(`0${month}`);
      yearRef.current?.focus();
      yearRef.current?.select();
    } else if (e.key === "Backspace" && !month) {
      e.preventDefault();
      dayRef.current?.focus();
    } else if (e.key === "ArrowLeft") {
      const input = monthRef.current;
      if (input && input.selectionStart === 0) {
        dayRef.current?.focus();
      }
    } else if (e.key === "ArrowRight") {
      const input = monthRef.current;
      if (input && input.selectionStart === month.length) {
        yearRef.current?.focus();
      }
    }
  };

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !year) {
      e.preventDefault();
      monthRef.current?.focus();
    } else if (e.key === "ArrowLeft") {
      const input = yearRef.current;
      if (input && input.selectionStart === 0) {
        monthRef.current?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const parsed = parseDateString(pasted);
    if (parsed) {
      setDay(parsed.day);
      setMonth(parsed.month);
      setYear(parsed.year);
    }
  };

  return (
    <div className="w-full">
      {/* Separator style selector */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
        <span className="font-medium text-slate-300">Date of Birth (DD / MM / YYYY)</span>
        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setSeparator("/")}
            className={`px-2 py-0.5 rounded font-mono font-medium transition-colors ${
              separator === "/"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            /
          </button>
          <button
            type="button"
            onClick={() => setSeparator("-")}
            className={`px-2 py-0.5 rounded font-mono font-medium transition-colors ${
              separator === "-"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            -
          </button>
        </div>
      </div>

      {/* Inputs Row */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-inner">
        {/* DAY */}
        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Day
          </span>
          <input
            ref={dayRef}
            type="text"
            inputMode="numeric"
            placeholder="DD"
            value={day}
            onChange={handleDayChange}
            onKeyDown={handleDayKeyDown}
            onPaste={handlePaste}
            maxLength={2}
            className="w-full text-center text-2xl sm:text-3xl font-mono font-bold py-2 sm:py-2.5 bg-slate-900 border-2 border-slate-700/80 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* SEPARATOR */}
        <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-600 select-none pt-4">
          {separator}
        </div>

        {/* MONTH */}
        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Month
          </span>
          <input
            ref={monthRef}
            type="text"
            inputMode="numeric"
            placeholder="MM"
            value={month}
            onChange={handleMonthChange}
            onKeyDown={handleMonthKeyDown}
            onPaste={handlePaste}
            maxLength={2}
            className="w-full text-center text-2xl sm:text-3xl font-mono font-bold py-2 sm:py-2.5 bg-slate-900 border-2 border-slate-700/80 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* SEPARATOR */}
        <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-600 select-none pt-4">
          {separator}
        </div>

        {/* YEAR */}
        <div className="flex flex-col items-center flex-[1.3]">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Year
          </span>
          <input
            ref={yearRef}
            type="text"
            inputMode="numeric"
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
            onKeyDown={handleYearKeyDown}
            onPaste={handlePaste}
            maxLength={4}
            className="w-full text-center text-2xl sm:text-3xl font-mono font-bold py-2 sm:py-2.5 bg-slate-900 border-2 border-slate-700/80 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
