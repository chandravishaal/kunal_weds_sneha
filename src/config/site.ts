export const SITE = {
  couple: {
    groom: 'Kunal',
    bride: 'Sneha',
  },
  wedding: {
    dateISO: '2026-11-21T16:00:00+05:30',
    dateDisplay: '21 NOVEMBER 2026',
    weekday: 'Saturday',
    timeIST: '4:00 PM IST',
  },
  venue: {
    nameHi: 'झारखंड पुलिस क्लब',
    name: 'Jharkhand Police Club',
    address: 'Line Tank Road, Ranchi, Jharkhand — 834001',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Jharkhand%20Police%20Club%2C%20Line%20Tank%20Road%2C%20Ranchi%2C%20Jharkhand',
  },
  baraat: {
    start: 'Our Venue in Mandar',
    destination: 'Jharkhand Police Club, Line Tank Road, Ranchi',
  },
  whatsapp: {
    // Groom's brother — for help with the invitation
    number: '918539904692',
    label: 'Need Help?',
    labelHi: 'मदद चाहिए?',
  },
} as const;

export interface WeddingEvent {
  id: string;
  day: string;
  weekday: string;
  date: string;
  titleHi: string;
  titleEn: string;
  time?: string;
  bubble: string;
}

export const EVENTS: WeddingEvent[] = [
  {
    id: 'tilak',
    day: 'DAY 01',
    weekday: 'WEDNESDAY',
    date: '18 NOVEMBER 2026',
    titleHi: 'शुभ तिलकोत्सव एवं प्रीतिभोज',
    titleEn: 'Tilakotsav & Preetibhoj',
    time: '6:00 PM onwards',
    bubble: 'शुरुआत हमारी खुशियों के साथ!',
  },
  {
    id: 'mehendi',
    day: 'DAY 02',
    weekday: 'THURSDAY',
    date: '19 NOVEMBER 2026',
    titleHi: 'मेहंदी एवं हल्दी',
    titleEn: 'Mehendi & Haldi',
    bubble: 'आज रंगों और खुशियों का दिन है!',
  },
  {
    id: 'kalyani',
    day: 'DAY 03',
    weekday: 'FRIDAY',
    date: '20 NOVEMBER 2026',
    titleHi: 'कल्याणी एवं मण्डपाच्छादन',
    titleEn: 'Kalyani & Mandapachchadan',
    bubble: 'बस अब शादी की तैयारियाँ अपने आखिरी पड़ाव पर हैं!',
  },
  {
    id: 'wedding',
    day: 'DAY 04',
    weekday: 'SATURDAY',
    date: '21 NOVEMBER 2026',
    titleHi: 'घृतधारी, बारात प्रस्थान एवं रात्रि में शुभ विवाह',
    titleEn: 'Ghritdhari, Baraat & Wedding',
    bubble: 'आज है सबसे बड़ा दिन! तैयार हैं?',
  },
];
