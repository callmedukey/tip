export function generateOrderNumber(number: number): string {
  return number.toString().padStart(4, "0");
}
