export default function subtractHoursFromTime(time: string, subtractHours: number): string {
  const [hoursStr, minutesStr] = time.split(":");

  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Subtract hours and handle wrap-around using modulo
  hours = (hours - subtractHours + 24) % 24;

  // Format back to "HH:mm"
  const newTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return newTime;
}