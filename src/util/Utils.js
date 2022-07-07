export function getPayCycle(year = "", month = "") {
  let code = "";
  const monthCodes = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  if (year === "" && month === "") {
    let d = new Date();

    const _year = d.getFullYear();

    code = _year + monthCodes[d.getMonth()];
  } else {
    code = year + monthCodes[month];
  }

  return code;
}

export function getMonthYearFromPayCycle(payCycle) {
  let months = new Map();
  months.set("JAN", "January");
  months.set("FEB", "February");
  months.set("MAR", "March");
  months.set("APR", "April");
  months.set("MAY", "May");
  months.set("JUN", "June");
  months.set("JUL", "July");
  months.set("AUG", "August");
  months.set("SEP", "September");
  months.set("OCT", "October");
  months.set("NOV", "Novembar");
  months.set("DEC", "Decembar");

  let year = payCycle.slice(0, 4);
  let month = months.get(payCycle.slice(4));

  return { year, month };
}

export function isObjEmpty(obj) {
  return !(() => {
    for (const i in obj) {
      return true;
    }
    return false;
  })();
}
