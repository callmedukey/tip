// Function to get all date components
function getDateComponents(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    
    // Get first day of the month
    const firstDay = new Date(year, date.getMonth(), 1).getDate();
    
    // Get last day of the month
    const lastDay = new Date(year, date.getMonth() + 1, 0).getDate();
    
    return {
      year,        // e.g., 2024
      month,       // e.g., 11 (for November)
      firstDay,    // will always be 1
    lastDay, // e.g., 30 or 31 depending on the month
  };
}

export function reconstructDate({ year, month, day }: { year: number, month: number, day: number }) {
  // Subtract 1 from month since Date constructor uses 0-based months
  const date = new Date(year, month - 1, day);
  // Set time to midnight (00:00:00.000)
  date.setHours(0, 0, 0, 0);
  return date;
}

export default getDateComponents;
