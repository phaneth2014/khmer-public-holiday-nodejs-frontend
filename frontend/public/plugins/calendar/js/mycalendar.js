var btn_prev = document.getElementById('prev-month');
var btn_next = document.getElementById('next-month');

var khmer_starter = new Date('2025-06-01');
var current_date = new Date();

var khmer_days = {
    keut: ["១​ កើត", "២ កើត", "៣ ​កើត", "៤​ កើត", "៥ ​កើត", "៦ កើត", "៧ កើត", "៨ ​កើត", "៩ ​កើត", "១​០ កើត",
        "១​១ កើត", "១​២ កើត", "១៣ ​កើត", "១៤ ​កើត", "១៥ ​កើត"
    ],
    roch: ["១​ រោច", "២ រោច", "៣ ​រោច", "៤​ រោច", "៥ ​រោច", "៦ រោច", "៧ រោច", "៨ ​រោច", "៩ ​រោច", "១​០ រោច",
        "១​១ រោច", "១​២ រោច", "១៣ ​រោច", "១៤ ​រោច", "១៥ ​រោច"
    ]
}

var khmer_daily = ["១​ កើត", "២ កើត", "៣ ​កើត", "៤​ កើត", "៥ ​កើត", "៦ កើត", "៧ កើត", "៨ ​កើត", "៩ ​កើត", "១​០ កើត",
    "១​១ កើត", "១​២ កើត", "១៣ ​កើត", "១៤ ​កើត", "១៥ ​កើត", "១​ រោច", "២ រោច", "៣ ​រោច", "៤​ រោច", "៥ ​រោច", "៦ រោច", "៧ រោច", "៨ ​រោច", "៩ ​រោច", "១​០ រោច",
    "១​១ រោច", "១​២ រោច", "១៣ ​រោច", "១៤ ​រោច", "១៥ ​រោច", "១​ កើត", "២ កើត", "៣ ​កើត", "៤​ កើត", "៥ ​កើត", "៦ កើត", "៧ កើត"];

var monthly = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

var weekday = ["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"];

var khmer_holidays = []

// momentkh plugin is used to calculate the Khmer New Year date based on the given year
function khmerNewYear(year) {
    var today = new Date();
    const newYear = momentkh.getNewYear(year || today.getFullYear());
    return newYear;

}

function getTodayInKhmer() {

    var khmer = momentkh.fromDate(new Date());
    var dd=new Date();
    document.getElementById('today-text').innerText = `ថ្ងៃទី${convertToKhmerNumber(dd.getDate())} ខែ${monthly[(dd.getMonth())]} ឆ្នាំ${convertToKhmerNumber(dd.getFullYear())} \n ${momentkh.format(khmer)}`;
}



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

function khmer_day_calculater(date) {

    let kh_day = ['កើត', 'រោច'];
    let khmer_calendar;
    if (parseInt(date) <= 15) {
        khmer_calendar = {
            khmer_days: khmer_days.keut,
            khmer_type: kh_day[0]
        }
    } else {
        khmer_calendar = {
            khmer_days: khmer_days.keut,
            khmer_type: kh_day[1]
        }
    }
    return khmer_calendar
}

function show_calendar() {

    getTodayInKhmer();
    getHoliday(current_date.getFullYear());

    var dayOfWeekly = new Date(current_date);
    var firstDay = new Date(current_date.setDate(1)).getDay();
    var totalDays = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();
    $('#calendar-title').text(
        `ប្រតិទិនសម្រាប់ខែ${monthly[current_date.getMonth()]} ឆ្នាំ${convertToKhmerNumber(current_date.getFullYear())}`);
    $('#tb-calendar thead tr').empty();
    $('#tb-calendar tbody').empty();
    for (let h = 0; h < weekday.length; h++) {
        var highligth = h == 0 ? 'first-day' : 'normal';
        highligth = h == 6 ? 'first-day' : highligth;
        $('#tb-calendar thead tr').append(`<th class="${highligth}">${weekday[h]}</th>`);
    }

    for (let i = 0; i < (Math.ceil((firstDay + totalDays) / 7)); i++) {
        var tr = `<tr id="row${i}"></tr>`;
        $('#tb-calendar tbody').append(tr);
    }

    var rowIndex = 0;
    for (let d = 0; d < totalDays; d++) {
        dayOfWeekly = new Date(dayOfWeekly.setDate(d + 1));

        if (rowIndex == 0 && d == 0 && dayOfWeekly.getDay() > 0) {
            for (c = 0; c < dayOfWeekly.getDay(); c++) {
                $('#row' + rowIndex).append(`<td class="blank-day"></td>`);
            }
        }
        var highligth = dayOfWeekly.getDay() == 0 ? 'first-day' : 'normal-day';
        highligth = dayOfWeekly.getDay() == 6 ? 'first-day' : highligth;

        $('#row' + rowIndex).append(`<td class="${highligth}" id="${formatDate(dayOfWeekly)}">${d + 1}</td>`);
        if (dayOfWeekly.getDay() == 6) {
            rowIndex++;
        }

    }
    // var new_url = `/home?month=${monthly[dayOfWeekly.getMonth()]}&mn=${dayOfWeekly.getMonth() + 1}&year=${dayOfWeekly.getFullYear()}`;
    // history.pushState(null, null, new_url);
    if (window.location.pathname == '/home' || window.location.pathname == '/') {
        holiday();
    } else if (window.location.pathname == '/holiday') {
        holiday_list();
    }

}

show_calendar();

function previous() {

    const mon = new Date(current_date);
    const full_day = new Date(mon.setMonth(mon.getMonth() - 1));
    current_date = new Date(full_day);

    show_calendar();

}

function next() {

    const mon = new Date(current_date);
    const full_day = new Date(mon.setMonth(mon.getMonth() + 1));
    current_date = new Date(full_day);
    show_calendar();

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function showTabByDate(date) {
    let dd = new Date(date);
    let khmer = momentkh.fromDate(dd);
    console.log(khmer, date);
    document.getElementById('today-text').innerText = `ថ្ងៃទី${convertToKhmerNumber(dd.getDate())} ខែ${monthly[(dd.getMonth())]} ឆ្នាំ${convertToKhmerNumber(dd.getFullYear())} \n ${momentkh.format(khmer)}`;
    var data = khmer_holidays.find((e) => e.day == date.toString());
    if (data) {
        document.getElementById('today-text').innerText += " " + data.desc;
    }

}

function convertNumString(num) {
    let n = num.toString();
    if (num.length == 1) {
        n = `0${num}`;
    }
    return n;
}
console.log(convertNumString(5));
function addHoliday(data, day) {
    if (data.monthIndex == 5 && data.day == 4 && data.moonPhase == 1) {
        let dd = `${day.getFullYear()}-${convertNumString(day.getMonth() + 1)}-${convertNumString(day.getDate())}`;
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីច្រក់ព្រះនង្គ័ល (Royal Ploughing Ceremony)"
        });
    } else if (data.monthIndex == 5 && data.day == 15 && data.moonPhase == 0) {
        let dd = `${day.getFullYear()}-${convertNumString(day.getMonth() + 1)}-${convertNumString(day.getDate())}`;
        khmer_holidays.push({
            day: dd,
            desc: "ពិធីបុណ្យវិសាខបូជា (Visakh Bochea Day)"
        });
    }

}

function checkKhmerHoliday() {
    let now = current_date;
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

}

async function holiday_list() {
    let dd = current_date;
    getHoliday(dd.getFullYear());
    document.getElementById('holiday-title').innerHTML = `តារាងថ្ងៃឈប់សម្រាកឆ្នាំ ${convertToKhmerNumber(dd.getFullYear())}`;
    checkKhmerHoliday();

    const newyear = khmerNewYear(dd.getFullYear());

    if (newyear.day == 13) {

        khmer_holidays.push({
            day: `${newyear.year}-0${newyear.month}-${newyear.day}`,
            desc: "បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
        })

        // console.log(newyear, khmer_holidays);
    }
    $('#holiday-list').empty();
    khmer_holidays.sort(
        (a, b) => new Date(a.day) - new Date(b.day)
    );
    for (let i = 0; i < khmer_holidays.length; i++) {
        const phdate = new Date(khmer_holidays[i].day);
        let khmerPh = `${convertToKhmerNumber(phdate.getDate())} ${monthly[phdate.getMonth()]} `;
        const li = `<li><div>${khmerPh}</div> <div>: ${khmer_holidays[i].desc}</div></li>`;
        $('#holiday-list').append(li);
    }
}

async function holiday() {
    $('#holiday-list').empty();
    getHoliday(current_date.getFullYear());
    var calendar = await document.getElementById('tb-calendar').getElementsByTagName('tbody')[0];

    const newyear = khmerNewYear(current_date.getFullYear());
    if (newyear.day == 13 && current_date.getMonth() == 3) {

        khmer_holidays.push({
            day: `${newyear.year}-0${newyear.month}-${newyear.day}`,
            desc: "បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
        })

        console.log(newyear, khmer_holidays);
    }
    khmer_holidays.sort(
        (a, b) => new Date(a.day) - new Date(b.day)
    );

    for (let i = 0; i < calendar.rows.length; i++) {

        for (r = 0; r < calendar.rows[i].cells.length; r++) {
            var today = new Date();
            if (calendar.rows[i].cells[r].id == formatDate(today)) {
                calendar.rows[i].cells[r].classList.add('today');
            }
            var td = calendar.rows[i].cells[r];

            if (td.id) {
                let dd = new Date(new Date(td.id));
                let khmer = momentkh.fromDate(dd);
                let khday = khmer.khmer;
                let moonPhase = convertToKhmerNumber(khday.day) + " " + khday.moonPhaseName;

                td.innerText = td.innerText + "\n" + moonPhase;

                if (khday.monthIndex == 5 && khday.day == 4 && khday.moonPhase == 1) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីច្រក់ព្រះនង្គ័ល (Royal Ploughing Ceremony)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីច្រក់ព្រះនង្គ័ល (Royal Ploughing Ceremony)"
                        });
                    }
                }
                if (khday.monthIndex == 5 && khday.day == 15 && khday.moonPhase == 0) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីបុណ្យវិសាខបូជា (Visakh Bochea Day)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីបុណ្យវិសាខបូជា (Visakh Bochea Day)"
                        });
                    }
                } else if (khday.monthIndex == 9 && khday.day == 14 && khday.moonPhase == 1) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី១ (Pchum Ben Day)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី១ (Pchum Ben Day)"
                        });
                    }
                } else if (khday.monthIndex == 9 && khday.day == 15 && khday.moonPhase == 1) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី២ (Pchum Ben Day)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី២ (Pchum Ben Day)"
                        });
                    }
                } else if (khday.monthIndex == 10 && khday.day == 1 && khday.moonPhase == 0) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី៣ (Pchum Ben Day)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីបុណ្យភ្ជុំបិណ្ឌថ្ងៃទី៣ (Pchum Ben Day)"
                        });
                    }
                } else if (khday.monthIndex == 11 && khday.day == 14 && khday.moonPhase == 0) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី១ (Water Festival Day)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី១ (Water Festival Day)"
                        });
                    }
                } else if (khday.monthIndex == 11 && khday.day == 15 && khday.moonPhase == 0) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី២ (Water Festival Day)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី២ (Water Festival Day)"
                        });
                    }
                } else if (khday.monthIndex == 11 && khday.day == 1 && khday.moonPhase == 1) {

                    const index = khmer_holidays.findIndex(e => e.day === td.id);
                    const da = khmer_holidays[index];
                    if (index !== -1) {
                        khmer_holidays[index] = {
                            ...khmer_holidays[index],
                            desc: da.desc + " និង ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី៣ (Water Festival Day)"
                        };
                    } else {
                        khmer_holidays.push({
                            day: td.id,
                            desc: "ពិធីបុណ្យភអ៊ុំទូកថ្ងៃទី៣ (Water Festival Day)"
                        });
                    }
                }
            }

            td.addEventListener('click', function (e) {
                console.log(e.target.id);
                showTabByDate(e.target.id);
            });

            var data = await khmer_holidays.find((e) => e.day == td.id);

            if (data) {
                const link = document.createElement('a');
                link.setAttribute('href', 'https://example.com');
                link.textContent = '';
                // td.appendChild(link);
                td.classList.add('holiday');
                td.setAttribute('title', data.desc);
                td.addEventListener('click', function (e) {
                    var elm = e.target.getAttribute('title');
                    $('.header-title').html('ការបង្ហាញប្រតិទិន្នលំអិត');
                    $('.modal-body').html(elm);
                    // $('.modal-fade').show();
                    // alert(elm);
                });
                const phdate = new Date(data.day);
                let khmerPh = `${convertToKhmerNumber(phdate.getDate())} ${monthly[phdate.getMonth()]} `;
                const li = `<li><div>${khmerPh}</div> <div>: ${data.desc}</div></li>`;
                // console.log(data.day, data.desc);
                $('#holiday-list').append(li);
            }

        }
    }
}



document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', function () {
        $('.modal-fade').hide();
    })

})


btn_prev.addEventListener('click', previous);
btn_next.addEventListener('click', next);


function previous_year() {
    const mon = new Date(current_date);
    const full_day = new Date(mon.setYear(mon.getFullYear() - 1));
    current_date = new Date(full_day);
    holiday_list();
}

function next_year() {
    const mon = new Date(current_date);
    const full_day = new Date(mon.setYear(mon.getFullYear() + 1));
    current_date = new Date(full_day);
    holiday_list();
}

var btn_prev_y = document.getElementById('prev-year');
var btn_next_y = document.getElementById('next-year');

if (btn_prev_y) {
    btn_prev_y.addEventListener('click', previous_year);
    btn_next_y.addEventListener('click', next_year);
}
