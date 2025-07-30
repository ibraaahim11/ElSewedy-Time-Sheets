import timeSheetService from "./src/services/timeSheetService.js";
import dateUtils from "./src/utils/dateUtils.js";

console.log(await timeSheetService.getProjectHoursBudget(1,1));
