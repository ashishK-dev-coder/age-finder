"use client";

import React, { useState, useRef } from "react";
import { RotateCcw } from "lucide-react";

export default function HomePage() {
  const [birthYearInput, setBirthYearInput] = useState("1998");
  const [fatherAgeInput, setFatherAgeInput] = useState("27");
  const [motherAgeInput, setMotherAgeInput] = useState("24");

  const birthRef = useRef<HTMLInputElement>(null);

  const currentYear = new Date().getFullYear();

  // In 1 -> User Age (R1)
  const bYear = parseInt(birthYearInput, 10);
  const isBirthValid =
    birthYearInput.length === 4 &&
    !isNaN(bYear) &&
    bYear >= 1900 &&
    bYear <= currentYear;
  const userAge = isBirthValid ? currentYear - bYear : null;

  // Father Born Year (depends only on In 1)
  const fAge = parseInt(fatherAgeInput, 10);
  const isFatherValid = !isNaN(fAge) && fAge > 0 && fAge < 120;
  const fatherBornYear =
    userAge !== null && isFatherValid ? currentYear - (userAge + fAge) : null;

  // Mother Born Year (depends only on In 1, independent of father)
  const mAge = parseInt(motherAgeInput, 10);
  const isMotherValid = !isNaN(mAge) && mAge > 0 && mAge < 120;
  const motherBornYear =
    userAge !== null && isMotherValid ? currentYear - (userAge + mAge) : null;

  const handleClear = () => {
    setBirthYearInput("");
    setFatherAgeInput("");
    setMotherAgeInput("");
    birthRef.current?.focus();
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
        {/* Top: Only Age Finder */}
        <h1 className="text-2xl font-bold text-center tracking-tight text-white">
          Age Finder
        </h1>

        {/* In 1: Your Birth Year */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
            Your Birth Year
          </label>
          <input
            ref={birthRef}
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="e.g. 1998"
            value={birthYearInput}
            onChange={(e) =>
              setBirthYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            className="w-full text-center text-2xl font-mono font-bold py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            autoFocus
          />
        </div>

        {/* User Age Result */}
        {userAge !== null && (
          <div className="bg-slate-950 border border-indigo-500/30 rounded-xl py-2.5 px-3 text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Your Age
            </span>
            <div className="text-3xl font-black font-mono text-indigo-400">
              {userAge} <span className="text-xs font-normal text-slate-500">Years</span>
            </div>
          </div>
        )}

        {/* Father & Mother Inputs Grid (both depend only on In 1) */}
        {userAge !== null && (
          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              {/* Father Box */}
              <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl space-y-1.5">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                  Father&apos;s Age
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="e.g. 27"
                  value={fatherAgeInput}
                  onChange={(e) =>
                    setFatherAgeInput(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  className="w-full text-center text-xl font-mono font-bold py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
                />

                {fatherBornYear !== null && (
                  <div className="pt-1.5 text-center border-t border-slate-800">
                    <span className="text-[9px] uppercase text-slate-500 block">Born Year</span>
                    <span className="text-lg font-bold font-mono text-purple-400">
                      {fatherBornYear}
                    </span>
                  </div>
                )}
              </div>

              {/* Mother Box (Depends only on In 1) */}
              <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl space-y-1.5">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                  Mother&apos;s Age
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="e.g. 24"
                  value={motherAgeInput}
                  onChange={(e) =>
                    setMotherAgeInput(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  className="w-full text-center text-xl font-mono font-bold py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 transition-colors"
                />

                {motherBornYear !== null && (
                  <div className="pt-1.5 text-center border-t border-slate-800">
                    <span className="text-[9px] uppercase text-slate-500 block">Born Year</span>
                    <span className="text-lg font-bold font-mono text-pink-400">
                      {motherBornYear}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clear Button Pinned to Bottom */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleClear}
            className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
