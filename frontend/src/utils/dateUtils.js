const dateUtils = {
  // takes date object and returns as string
  getDateString: (date) => date.toISOString().split("T")[0],

  // get today's date as string
  getTodayDateString: () => dateUtils.getDateString(new Date()),

  // gets next sunday date as string
  getNextSundayString: (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();

    const daysUntilSunday = (7 - dayOfWeek) % 7;

    const newDate = new Date(date);
    newDate.setDate(date.getDate() + daysUntilSunday);

    return dateUtils.getDateString(newDate);
  },
  // takes date string and formats as "dd-mm-yyyy"
  formatDateToDDMMYYYY: (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  },
  // takes start date as string and returns array of date strings in the format dd-mm
  getArrayWeekDays: (startDateString) => {
    const start = new Date(startDateString);
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dd = String(day.getDate()).padStart(2, "0");
      const mm = String(day.getMonth() + 1).padStart(2, "0");
      weekDays.push(`${dd}-${mm}`);
    }

    return weekDays;
  },
  getArrayWeekDaysYYYYMMDD: (startDateString) => {
    const start = new Date(startDateString);
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);

      const yyyy = day.getFullYear();
      const mm = String(day.getMonth() + 1).padStart(2, "0");
      const dd = String(day.getDate()).padStart(2, "0");

      weekDays.push(`${yyyy}-${mm}-${dd}`);
    }

    return weekDays;
  },
};

export default dateUtils;
