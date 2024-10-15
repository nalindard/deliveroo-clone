import { format } from "date-fns";

export function formatDateInDBFormat(date: Date): string {
    // const day = date.getDate().toString().padStart(2, '0')
    // const month = (date.getMonth() + 1).toString().padStart(2, '0')
    // const year = date.getFullYear().toString()
    // return `${day}/${month}/${year}`

    // console.log('date-fns', date)

    return format(date, 'yyyy-MM-dd HH:mm:ss')
}

export function getStartAndEndOfWeek(year: number, month: number, week: number): { start: string, end: string } {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Calculate start day of the target week (assuming the week starts on Monday)
    const startOfWeek = new Date(firstDayOfMonth);
    const daysToAdd = (week - 1) * 7 - (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust for Sunday
    startOfWeek.setDate(firstDayOfMonth.getDate() + daysToAdd);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    return {
      start: formatDateInDBFormat(new Date(startOfWeek.setHours(0, 0, 0, 0))),
      end: formatDateInDBFormat(new Date(endOfWeek.setHours(23, 59, 59, 999))) 
    };
}
  

export function getStartAndEndOfMonth(year: number, month: number): { start: string, end: string } {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
  
    return {
      start: formatDateInDBFormat(new Date(startOfMonth.setHours(0, 0, 0, 0))),
      end: formatDateInDBFormat(new Date(endOfMonth.setHours(23, 59, 59, 999)))
    };
}

export function getDate(year:number, month:number, day:number, end?:boolean): string {
    if(end) return formatDateInDBFormat(new Date(year, month - 1, day, 23, 59, 59, 999))
    return formatDateInDBFormat(new Date(year, month - 1, day, 0, 0, 0, 0))
}