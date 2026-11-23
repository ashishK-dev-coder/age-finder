export interface DateParts {
  day: string;
  month: string;
  year: string;
}

export interface ZodiacSign {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  traits: string[];
}

export interface ChineseZodiac {
  animal: string;
  symbol: string;
  element: string;
}

export interface Milestone {
  age: number;
  label: string;
  date: Date;
  dateFormatted: string;
  reached: boolean;
}

export interface NextBirthdayInfo {
  daysRemaining: number;
  monthsRemaining: number;
  daysExactRemaining: number;
  totalDaysRemaining: number;
  dayOfWeek: string;
  dateFormatted: string;
  isToday: boolean;
  turningAge: number;
}

export interface AgeCalculationResult {
  birthDate: Date;
  targetDate: Date;
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  dayOfWeekBorn: string;
  nextBirthday: NextBirthdayInfo;
  zodiac: ZodiacSign;
  chineseZodiac: ChineseZodiac;
  milestones: Milestone[];
  isFuture: boolean;
  isValid: boolean;
  errorMessage?: string;
}
