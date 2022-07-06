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
    "OVT",
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

export function isObjEmpty(obj) {
  return !(() => {
    for (const i in obj) {
      return true;
    }
    return false;
  })();
}
