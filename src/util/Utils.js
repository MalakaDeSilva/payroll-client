export function getPayCycle() {
  let d = new Date();

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

  const year = d.getFullYear();

  let code = year + monthCodes[d.getMonth()];
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
