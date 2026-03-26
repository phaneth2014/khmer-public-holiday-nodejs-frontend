

function convertToKhmerDate(date) {
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

function convertToKhmerNumber(number) {
    let khnum = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    let khNumber = '';
    let numStr = number.toString().split('');
    for (let i = 0; i < numStr.length; i++) {
        khNumber += khnum[parseInt(numStr[i])];
    }
    return khNumber;
}



