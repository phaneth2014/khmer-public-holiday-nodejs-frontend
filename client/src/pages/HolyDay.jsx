import React from 'react';

const HolyDay= () => {
  // ១. ទិន្នន័យយោង (Reference Data)
  const startDate = new Date(2025, 11, 20); // ១ កើត ខែមិគសិរ
  const khmerMonths = [
    { name: "មិគសិរ", days: 29 }, { name: "បុស្ស", days: 30 },
    { name: "មាឃ", days: 29 },  { name: "ផល្គុន", days: 30 }, 
    { name: "ចែក្រ", days: 29 }, { name: "ពិសាខ", days: 30 },
    { name: "ជេស្ឋ", days: 29 }, { name: "អាសាឍ", days: 30 },
    { name: "ស្រាពណ៍", days: 29 }, { name: "ភទ្របទ", days: 30 },
    { name: "អស្សុជ", days: 29 }, { name: "កក្ដិក", days: 30 }
  ];

  // ២. មុខងារគណនាថ្ងៃសីលទាំងអស់
  const getAllHolyDays = () => {
    let currentSolarDate = new Date(startDate);
    let results = [];

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
    return results;
  };

  const holyDays = getAllHolyDays();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        តារាងកាលបរិច្ឆេទថ្ងៃសីល
      </h2>
      
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ខែចន្ទគតិ</th>
              <th className="py-3 px-4 text-left">ថ្ងៃសីល</th>
              <th className="py-3 px-4 text-left">ត្រូវនឹងថ្ងៃសកល</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {holyDays.map((day, index) => (
              <tr key={index} className="border-b hover:bg-blue-50 transition">
                <td className="py-3 px-4">{day.khmerMonth}</td>
                <td className="py-3 px-4 font-semibold text-orange-600">
                  {day.lunarDay}
                </td>
                <td className="py-3 px-4 text-sm">{day.solarDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolyDay;