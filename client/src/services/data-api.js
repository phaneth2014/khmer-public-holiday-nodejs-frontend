import momentkh from "@thyrith/momentkh";

const today = new Date();

var khmer_holidays = []


// end of momentkh plugin
function getHoliday(year) {

    khmer_holidays = [

        {
            day: `${year}-01-01`,
            desc: "បុណ្យចូលឆ្នាំសាកល International New Year's Day"
        },
        {
            day: `${year}-01-07`,
            desc: "ទិវា​ជ័យ​ជម្នះ​លើ​របប​ប្រល័យ​ពូជ​សាសន៍ Victory Day"
        },
        {
            day: `${year}-03-08`,
            desc: "ទិវាសិទ្ធនារី ៨មីនា International Women's Day"
        },
        {
            day: `${year}-04-14`,
            desc: "បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
        },
        {
            day: `${year}-04-15`,
            desc: "បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
        },
        {
            day: `${year}-04-16`,
            desc: "បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
        },

        {
            day: `${year}-05-01`,
            desc: "ទិវាពលកម្មអន្តរជាតិ (International Labor Day)"
        },
        {
            day: `${year}-05-14`,
            desc: "ព្រះ​រាជ​ពិធី​បុណ្យ​ចម្រើន​ព្រះ​ជន្ម ព្រះបាទនរោត្តមសីហមុនី (King Sihamoni's Birthday)"
        },
        {
            day: `${year}-06-18`,
            desc: "ព្រះ​រាជ​ពិធី​បុណ្យ​ចម្រើន​ព្រះ​ជន្ម សម្តេច​ព្រះ​មហាក្សត្រីនរោត្តម មុនិនាថ សីហនុ (Queen Mother's Birthday)"
        },
        {
            day: `${year}-09-24`,
            desc: "ទិវារដ្ឋធម្មនុញ្ញ (Constitution Day)"
        },

        {
            day: `${year}-10-15`,
            desc: "រំលឹកវិញ្ញាណក្ខន្ធ សម្តេចឪ (Commemoration of Late King Father)"
        },
        {
            day: `${year}-10-29`,
            desc: "ព្រះរាជពិធីឡើងគ្រងរាជ្យរបស់ព្រះបាទនរោត្តមសីហមុនី (King Norodom Sihamoni’s Coronation Day)"
        },
        {
            day: `${year}-11-09`,
            desc: "ទិវាឯករាជ្យ (Independence Day)"
        },

        {
            day: `${year}-12-29`,
            desc: "ទិវាសន្តិភាព (Peace Day)"
        },
    ]
}

getHoliday(today.getFullYear());

export const convertToKhmerDate = (date) => {
    let khDate = '';
    let khYear = '';
    let day = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    let daily = ["អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];
    let lunarMonth = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
    let dd = date.getDate().toString().split('');
    let mm = date.getMonth();
    let yyyy = date.getFullYear().toString().split('');
    let dayOfWeek = date.getDay();

    for (let i = 0; i < dd.length; i++) {
        khDate += day[parseInt(dd[i])];
    }

    for (let i = 0; i < yyyy.length; i++) {
        khYear += day[parseInt(yyyy[i])];
    }

    return `ថ្ងៃ${daily[dayOfWeek]} ទី${khDate} ខែ${lunarMonth[mm]} ឆ្នាំ${khYear}`;
}

function convertNumString(num) {
    if (num.length > 1) {
        return num;
    } else {
        return `0${num}`;
    }
}

function addHoliday(data, day) {
    const dd = `${day.getFullYear()}-${convertNumString(day.getMonth() + 1)}-${convertNumString(day.getDate())}`;
    if (data.monthIndex == 5 && data.day == 4 && data.moonPhase == 1) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីច្រក់ព្រះនង្គ័ល (Royal Ploughing Ceremony)"
        });
    } else if (data.monthIndex == 5 && data.day == 15 && data.moonPhase == 0) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យវិសាខបូជា (Visakh Bochea Day)"
        });
    } else if (data.monthIndex == 9 && data.day == 14 && data.moonPhase == 1) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី១ (Pchum Ben Day one)"
        });
    } else if (data.monthIndex == 9 && data.day == 15 && data.moonPhase == 1) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី២ (Pchum Ben Day two)"
        });
    } else if (data.monthIndex == 10 && data.day == 1 && data.moonPhase == 0) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី៣ (Pchum Ben Day three)"
        });
    } else if (data.monthIndex == 11 && data.day == 14 && data.moonPhase == 0) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី១ (Water Festival Day one)"
        });
    } else if (data.monthIndex == 11 && data.day == 15 && data.moonPhase == 0) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី២ (Water Festival Day two)"
        });
    } else if (data.monthIndex == 11 && data.day == 1 && data.moonPhase == 1) {
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី៣ (Water Festival Day three)"
        });
    }
}

function checkKhmerHoliday(date) {
    let now = date;
    let mn5 = new Date(now.getFullYear(), 4, 1);
    let mn9 = new Date(now.getFullYear(), 9, 1);
    let mn10 = new Date(now.getFullYear(), 9, 1);
    let mn11 = new Date(now.getFullYear(), 10, 1);
    let lastDay5 = new Date(mn5.getFullYear(), mn5.getMonth() + 1, 0);
    let lastDay9 = new Date(mn9.getFullYear(), mn9.getMonth() + 1, 0);
    let lastDay10 = new Date(mn10.getFullYear(), mn10.getMonth() + 1, 0);
    let lastDay11 = new Date(mn11.getFullYear(), mn11.getMonth() + 1, 0);

    for (let i = 0; i < lastDay5.getDate(); i++) {
        let day = new Date(mn5.getFullYear(), mn5.getMonth(), i + 1);
        let khmer = momentkh.fromDate(day);
        let khday = khmer.khmer;
        addHoliday(khday, day);
    }
    for (let i = 0; i < lastDay9.getDate(); i++) {
        let day = new Date(mn9.getFullYear(), mn9.getMonth(), i + 1);
        let khmer = momentkh.fromDate(day);
        let khday = khmer.khmer;
        addHoliday(khday, day);
    }
    for (let i = 0; i < lastDay10.getDate(); i++) {
        let day = new Date(mn10.getFullYear(), mn10.getMonth(), i + 1);
        let khmer = momentkh.fromDate(day);
        let khday = khmer.khmer;
        addHoliday(khday, day);
    }
    for (let i = 0; i < lastDay11.getDate(); i++) {
        let day = new Date(mn11.getFullYear(), mn11.getMonth(), i + 1);
        let khmer = momentkh.fromDate(day);
        let khday = khmer.khmer;
        addHoliday(khday, day);
    }
}

function holiday_list(date) {
    let dd = date || new Date();
    getHoliday(dd.getFullYear());

    checkKhmerHoliday(dd);

    const newyear = khmerNewYear(dd.getFullYear());

    if (newyear.day == 13) {

        khmer_holidays.push({
            day: `${newyear.year}-0${newyear.month}-${newyear.day}`,
            desc: "បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
        })
    }

    return khmer_holidays.sort(
        (a, b) => new Date(a.day) - new Date(b.day)
    );
}

export const convertToKhmerNumber = (number) => {
    let khnum = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    let khNumber = '';
    let numStr = number.toString().split('');
    for (let i = 0; i < numStr.length; i++) {
        khNumber += khnum[parseInt(numStr[i])];
    }
    return khNumber;
}

export function khmerNewYear(year) {
    var today = new Date();
    const newYear = momentkh.getNewYear(year || today.getFullYear());
    return newYear || today;
}

export function holidays(date) {
    return holiday_list(date || new Date());
}

export function KhmerLunar(date) {
    // your logic here
    var khmer = momentkh.fromDate(date || new Date());
    return khmer; // example only
}
