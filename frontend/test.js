import managerService from "./src/services/managerService.js";

console.log(
  await managerService.getAllEmployeeTsByProjectId(1)
);
