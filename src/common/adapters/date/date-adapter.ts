export interface IDateAdapter {
    zonedTimeToUtc(date: string | number | Date, timeZone: string): Date
    subHours(date: number | Date, amount: number): Date
    subMonths(date: number | Date, amount: number): Date
    subDays(date: number | Date, amount: number): Date
    subYears(date: number | Date, amount: number): Date
    addDays(date: number | Date, amount: number): Date
    parseDate(date: string, formatString: string): Date
    formatDate(date: Date | number, formatString: string): string
}