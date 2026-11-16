const START_UTC = '20261121T103000Z'; // 21 Nov 2026, 4:00 PM IST
const END_UTC = '20261121T110000Z'; // 4:30 PM IST departure window

const TITLE = 'Baraat Departure — Kunal & Sneha';
const DETAILS =
  'Baraat departs at 4:00 PM IST from Hesmi More, Mandar. ' +
  'Destination: Jharkhand Police Club, Line Tank Road, Ranchi. ' +
  'रात्रि में शुभ विवाह। A 15-minute reminder is included.';
const LOCATION = 'Jharkhand Police Club, Line Tank Road, Ranchi, Jharkhand 834001';

export const GCAL_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  TITLE,
)}&dates=${START_UTC}/${END_UTC}&details=${encodeURIComponent(DETAILS)}&location=${encodeURIComponent(LOCATION)}`;
