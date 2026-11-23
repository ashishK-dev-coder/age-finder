import { AgeCalculationResult, ChineseZodiac, Milestone, NextBirthdayInfo, ZodiacSign } from "@/types";

// Days in months helper (accounting for leap year)
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month: number): number {
  // month is 1-indexed (1 = January, 12 = December)
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1] || 31;
}

export function getZodiacSign(day: number, month: number): ZodiacSign {
  // Month is 1-indexed
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire", traits: ["Courageous", "Determined", "Confident"] };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth", traits: ["Reliable", "Patient", "Devoted"] };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air", traits: ["Adaptable", "Outgoing", "Curious"] };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water", traits: ["Intuitive", "Empathetic", "Protective"] };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire", traits: ["Passionate", "Generous", "Warm-hearted"] };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth", traits: ["Loyal", "Analytical", "Kind"] };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air", traits: ["Diplomatic", "Gracious", "Fair-minded"] };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water", traits: ["Resourceful", "Brave", "Passionate"] };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire", traits: ["Generous", "Idealistic", "Great humor"] };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth", traits: ["Responsible", "Disciplined", "Self-control"] };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air", traits: ["Progressive", "Original", "Independent"] };
  } else {
    return { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water", traits: ["Compassionate", "Artistic", "Wise"] };
  }
}

export function getChineseZodiac(year: number): ChineseZodiac {
  const animals = [
    { animal: "Rat", symbol: "🐀" },
    { animal: "Ox", symbol: "🐂" },
    { animal: "Tiger", symbol: "🐅" },
    { animal: "Rabbit", symbol: "🐇" },
    { animal: "Dragon", symbol: "🐉" },
    { animal: "Snake", symbol: "🐍" },
    { animal: "Horse", symbol: "🐎" },
    { animal: "Goat", symbol: "🐐" },
    { animal: "Monkey", symbol: "🐒" },
    { animal: "Rooster", symbol: "🐓" },
    { animal: "Dog", symbol: "🐕" },
    { animal: "Pig", symbol: "🐖" },
  ];
  // 1900 was Year of the Rat (offset 0)
  const index = (year - 4) % 12;
  const positiveIndex = (index + 12) % 12;

  const elements = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];
  const elemIndex = (year - 4) % 10;
  const element = elements[(elemIndex + 10) % 10];

  return {
    animal: animals[positiveIndex].animal,
    symbol: animals[positiveIndex].symbol,
    element: element,
  };
}

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function calculateAge(
  day: number,
  month: number,
  year: number,
  targetDate: Date = new Date()
): AgeCalculationResult {
  // Validate basic inputs
  if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1000 || year > 3000) {
    return {
      birthDate: new Date(),
      targetDate,
      years: 0,
      months: 0,
      days: 0,
      totalMonths: 0,
      totalWeeks: 0,
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      dayOfWeekBorn: "",
      nextBirthday: {} as NextBirthdayInfo,
      zodiac: {} as ZodiacSign,
      chineseZodiac: {} as ChineseZodiac,
      milestones: [],
      isFuture: false,
      isValid: false,
      errorMessage: "Please enter a valid 4-digit year.",
    };
  }

  if (month < 1 || month > 12) {
    return {
      birthDate: new Date(),
      targetDate,
      years: 0,
      months: 0,
      days: 0,
      totalMonths: 0,
      totalWeeks: 0,
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      dayOfWeekBorn: "",
      nextBirthday: {} as NextBirthdayInfo,
      zodiac: {} as ZodiacSign,
      chineseZodiac: {} as ChineseZodiac,
      milestones: [],
      isFuture: false,
      isValid: false,
      errorMessage: "Month must be between 01 and 12.",
    };
  }

  const maxDays = getDaysInMonth(year, month);
  if (day < 1 || day > maxDays) {
    return {
      birthDate: new Date(),
      targetDate,
      years: 0,
      months: 0,
      days: 0,
      totalMonths: 0,
      totalWeeks: 0,
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      dayOfWeekBorn: "",
      nextBirthday: {} as NextBirthdayInfo,
      zodiac: {} as ZodiacSign,
      chineseZodiac: {} as ChineseZodiac,
      milestones: [],
      isFuture: false,
      isValid: false,
      errorMessage: `Selected month only has ${maxDays} days.`,
    };
  }

  const birthDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  // Normalize target date to start of day for clean day math
  const targetMidnight = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    0,
    0,
    0,
    0
  );

  // Future date check
  if (birthDate.getTime() > targetMidnight.getTime()) {
    return {
      birthDate,
      targetDate: targetMidnight,
      years: 0,
      months: 0,
      days: 0,
      totalMonths: 0,
      totalWeeks: 0,
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      dayOfWeekBorn: DAYS_OF_WEEK[birthDate.getDay()],
      nextBirthday: {} as NextBirthdayInfo,
      zodiac: getZodiacSign(day, month),
      chineseZodiac: getChineseZodiac(year),
      milestones: [],
      isFuture: true,
      isValid: false,
      errorMessage: "Birth date cannot be in the future!",
    };
  }

  // Exact Year, Month, Day calculation
  let years = targetMidnight.getFullYear() - birthDate.getFullYear();
  let months = targetMidnight.getMonth() - birthDate.getMonth();
  let days = targetMidnight.getDate() - birthDate.getDate();

  if (days < 0) {
    // Borrow from previous month of target date
    const prevMonth = targetMidnight.getMonth() === 0 ? 12 : targetMidnight.getMonth();
    const prevMonthYear = prevMonth === 12 ? targetMidnight.getFullYear() - 1 : targetMidnight.getFullYear();
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    days += daysInPrevMonth;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Total differences
  const diffTimeMs = targetMidnight.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffTimeMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Next Birthday Calculation
  const currentTargetYear = targetMidnight.getFullYear();
  let nextBdayYear = currentTargetYear;
  // Account for leap year birth date Feb 29
  let nextBdayMonth = month - 1;
  let nextBdayDay = day;
  if (month === 2 && day === 29 && !isLeapYear(nextBdayYear)) {
    nextBdayDay = 28;
  }

  let nextBdayDate = new Date(nextBdayYear, nextBdayMonth, nextBdayDay, 0, 0, 0, 0);

  // If next birthday date has already passed this year, it falls in next year
  if (nextBdayDate.getTime() < targetMidnight.getTime()) {
    nextBdayYear += 1;
    if (month === 2 && day === 29 && !isLeapYear(nextBdayYear)) {
      nextBdayDay = 28;
    } else {
      nextBdayDay = day;
    }
    nextBdayDate = new Date(nextBdayYear, nextBdayMonth, nextBdayDay, 0, 0, 0, 0);
  }

  const isToday =
    targetMidnight.getDate() === day &&
    targetMidnight.getMonth() === month - 1;

  const msToNextBirthday = nextBdayDate.getTime() - targetMidnight.getTime();
  const totalDaysToNextBday = Math.round(msToNextBirthday / (1000 * 60 * 60 * 24));

  // Months and days remaining to next birthday
  let nextBdayMonths = nextBdayDate.getMonth() - targetMidnight.getMonth();
  let nextBdayDays = nextBdayDate.getDate() - targetMidnight.getDate();

  if (nextBdayDays < 0) {
    const prevM = targetMidnight.getMonth() === 0 ? 12 : targetMidnight.getMonth();
    const prevY = prevM === 12 ? targetMidnight.getFullYear() - 1 : targetMidnight.getFullYear();
    nextBdayDays += getDaysInMonth(prevY, prevM);
    nextBdayMonths -= 1;
  }
  if (nextBdayMonths < 0) {
    nextBdayMonths += 12;
  }

  const turningAge = isToday ? years : years + 1;

  const nextBirthday: NextBirthdayInfo = {
    daysRemaining: nextBdayDays,
    monthsRemaining: nextBdayMonths,
    daysExactRemaining: nextBdayDays,
    totalDaysRemaining: totalDaysToNextBday,
    dayOfWeek: DAYS_OF_WEEK[nextBdayDate.getDay()],
    dateFormatted: nextBdayDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    isToday,
    turningAge,
  };

  // Milestones (e.g. 1, 10, 18, 21, 25, 30, 40, 50, 60, 75, 100)
  const milestoneYears = [1, 5, 10, 16, 18, 21, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100];
  const milestones: Milestone[] = milestoneYears.map((milestoneAge) => {
    let mDay = day;
    const mYear = year + milestoneAge;
    if (month === 2 && day === 29 && !isLeapYear(mYear)) {
      mDay = 28;
    }
    const mDate = new Date(mYear, month - 1, mDay);
    return {
      age: milestoneAge,
      label: `${milestoneAge}th Birthday`,
      date: mDate,
      dateFormatted: mDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      reached: targetMidnight.getTime() >= mDate.getTime(),
    };
  });

  return {
    birthDate,
    targetDate: targetMidnight,
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    dayOfWeekBorn: DAYS_OF_WEEK[birthDate.getDay()],
    nextBirthday,
    zodiac: getZodiacSign(day, month),
    chineseZodiac: getChineseZodiac(year),
    milestones,
    isFuture: false,
    isValid: true,
  };
}

/**
 * Parses user input like:
 * "12/06/2001" or "12-06-2001" or "12.06.2001" or "2001-06-12"
 */
export function parseDateString(str: string): { day: string; month: string; year: string } | null {
  const clean = str.trim();
  if (!clean) return null;

  // Check delimiters: /, -, ., or space
  const parts = clean.split(/[/.\-\s]+/);

  if (parts.length === 3) {
    // If first part is 4 digits, likely YYYY-MM-DD
    if (parts[0].length === 4) {
      return {
        year: parts[0],
        month: parts[1].padStart(2, "0"),
        day: parts[2].padStart(2, "0"),
      };
    }
    // Else DD-MM-YYYY (or DD/MM/YYYY)
    return {
      day: parts[0].padStart(2, "0"),
      month: parts[1].padStart(2, "0"),
      year: parts[2],
    };
  }

  // If 8 continuous digits like 12062001 (DDMMYYYY)
  if (/^\d{8}$/.test(clean)) {
    return {
      day: clean.slice(0, 2),
      month: clean.slice(2, 4),
      year: clean.slice(4, 8),
    };
  }

  return null;
}
