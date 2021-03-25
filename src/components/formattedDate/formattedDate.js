function checkDigit(t) {
  return t < 10 ? `0${t}` : t;
}

export const formattedDate = (incomeDate) => {
  let date = new Date(incomeDate);

  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();

  return `${checkDigit(mm)}.${checkDigit(dd)}.${yyyy}`;
};

export const unformattedDate = (incomeDate) => {
  let mm = incomeDate.split(".")[0];
  let dd = incomeDate.split(".")[1];
  let yyyy = incomeDate.split(".")[2];

  return `${yyyy}-${mm}-${dd}`;
};

export const formattedTime = (incomeTime) => {
  let hh = incomeTime.split(":")[0];
  let mm = incomeTime.split(":")[1];

  return `${checkDigit(hh)}:${mm}`;
};
