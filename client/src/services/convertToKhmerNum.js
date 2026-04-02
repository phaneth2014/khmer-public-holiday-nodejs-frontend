  import momentkh from "@thyrith/momentkh";

  const khMonths = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

 export const converToKhmerMonth = (monthIndex) => {
  return khMonths[monthIndex] || "";
};

export const convertToKhmerNumerals = (num) => {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return num
    .toString()
    .split("")
    .map((digit) => (/\d/.test(digit) ? khmerDigits[parseInt(digit)] : digit))
    .join("");
}

export const checkOddEvenNum =(num)=>{
  
  const result = (num % 2 === 0) ? "Even" : "Odd";
  return result;
}

export const checkBuddhaDay = (date) => {
  let dd = date.getDate();
  dd = (date.setDate(dd + 1));
  const khmerDate = momentkh.fromDate(new Date(dd));

  const isBuddhaDay = khmerDate.khmer;
  return isBuddhaDay;
}

export const holyDayDates = () => {
  const startDate = new Date(2025, 11, 20); // ១ កើត ខែមិគសិរ
   let results = [];

  const khmerMonths = [  
    { name: "មិគសិរ", days: 29 }, { name: "បុស្ស", days: 30 }, 
    { name: "មាឃ", days: 29 },  { name: "ផល្គុន", days: 30 }, 
    { name: "ចែក្រ", days: 29 }, { name: "ពិសាខ", days: 30 }, 
    { name: "ជេស្ឋ", days: 29 }, { name: "អាសាឍ", days: 30 }, 
    { name: "ស្រាពណ៍", days: 29 }, { name: "ភទ្របទ", days: 30 }, 
    { name: "អស្សុជ", days: 29 }, { name: "កក្ដិក", days: 30 } 
  ];

  let currentSolarDate = new Date(startDate);

   khmerMonths.forEach((month) => {
      for (let d = 1; d <= month.days; d++) {
        let label = "";
        if (d === 8) label = "៨ កើត";
        else if (d === 15) label = "១៥ កើត (ពេញច័ន្ទ)";
        else if (d === 23) label = "៨ រនោច";
        else if (d === month.days) label = (month.days === 29) ? "១៤ រោច" : "១៥ រោច";

        if (label) {
          results.push({
            khmerMonth: month.name,
            lunarDay: label,
            solarDate: new Date(currentSolarDate).toLocaleDateString('km-KH', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })
          });
        }
        currentSolarDate.setDate(currentSolarDate.getDate() + 1);
      }
    });

  
  return khmerMonths.flatMap((month) => {
    const monthStart = new Date(startDate);
    const monthEnd = new Date(startDate);
    monthEnd.setDate(monthEnd.getDate() + month.days - 1);
    const holyDays = [];
    for (let d = 1; d <= month.days; d++) {
      if (d === 8) holyDays.push("8 កើត");
       else if (d === 15) holyDays.push("15 កើត");
       else if (d === 23) holyDays.push("8 រនោច");
       else if (d === month.days) holyDays.push((month.days === 29) ? "14 រោច" : "15 រោច");
      if (d === 8 || d === 15 || d === 23 || d === month.days) {
        holyDays.push(new Date(monthStart));
      }
      monthStart.setDate(monthStart.getDate() + 1);
    }
    startDate.setDate(startDate.getDate() + month.days);
    return (holyDays);
  });
  
};

