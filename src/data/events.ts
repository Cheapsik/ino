export type EventLevel = "Low" | "Medium" | "High";

export type EventCategory = {
  name: EventLevel;
  spotsTotal: number;
  spotsTaken: number;
};

export type EventScheduleItem = {
  time: string;
  label: string;
  note?: string;
};

export type EventResultEntry = {
  rank: number;
  name: string;
  time: string;
  dsq: boolean;
};

export type EventResult = {
  category: EventLevel;
  entries: EventResultEntry[];
};

export type OrienteeringEvent = {
  id: string;
  title: string;
  date: string;
  raceStartTime: string;
  location: string;
  googleMapsUrl: string;
  status: "open" | "closed" | "live" | "finished";
  mapImageUrl: string | null;
  categories: EventCategory[];
  schedule: EventScheduleItem[];
  results?: EventResult[];
};

export const events: OrienteeringEvent[] = [
  {
    id: "1",
    title: "Nocny Bieg o Puchar Lasu",
    date: "2026-05-12T21:00:00+02:00",
    raceStartTime: "2026-05-12T21:00:00+02:00",
    location: "Puszcza Kampinoska, Truskaw",
    googleMapsUrl: "https://maps.google.com/?q=Truskaw+Puszcza+Kampinoska",
    status: "open",
    mapImageUrl: null,
    categories: [
      { name: "Low", spotsTotal: 20, spotsTaken: 12 },
      { name: "Medium", spotsTotal: 20, spotsTaken: 5 },
      { name: "High", spotsTotal: 20, spotsTaken: 18 },
    ],
    schedule: [
      { time: "09:00", label: "Odprawa zawodników", note: "Strefa startu, leśniczówka" },
      { time: "09:30", label: "Wydawanie map i kart startowych" },
      { time: "10:00", label: "START", note: "Wszystkie kategorie równocześnie" },
      { time: "13:00", label: "Dekoracja i ogłoszenie wyników" },
    ],
  },
  {
    id: "2",
    title: "Wiosenny Sprint Miejski",
    date: "2026-05-18T10:00:00+02:00",
    raceStartTime: "2026-05-18T10:00:00+02:00",
    location: "Wrocław, Park Szczytnicki",
    googleMapsUrl: "https://maps.google.com/?q=Park+Szczytnicki+Wroclaw",
    status: "closed",
    mapImageUrl: null,
    categories: [
      { name: "Low", spotsTotal: 30, spotsTaken: 30 },
      { name: "Medium", spotsTotal: 30, spotsTaken: 29 },
      { name: "High", spotsTotal: 30, spotsTaken: 30 },
    ],
    schedule: [
      { time: "08:30", label: "Biuro zawodów otwarte" },
      { time: "09:30", label: "Briefing techniczny", note: "Przy pergoli głównej" },
      { time: "10:00", label: "Start interwałowy" },
      { time: "12:30", label: "Zakończenie i podsumowanie" },
    ],
  },
  {
    id: "3",
    title: "Leśny Półmaraton na Azymut",
    date: "2026-04-28T18:30:00+02:00",
    raceStartTime: "2026-04-28T18:30:00+02:00",
    location: "Palmiry, Kampinos",
    googleMapsUrl: "https://maps.google.com/?q=Palmiry+Kampinos",
    status: "live",
    mapImageUrl: null,
    categories: [
      { name: "Low", spotsTotal: 25, spotsTaken: 25 },
      { name: "Medium", spotsTotal: 25, spotsTaken: 24 },
      { name: "High", spotsTotal: 25, spotsTaken: 22 },
    ],
    schedule: [
      { time: "17:00", label: "Weryfikacja zawodników" },
      { time: "18:00", label: "Otwarcie strefy startowej" },
      { time: "18:30", label: "START", note: "Masa startowa" },
      { time: "21:00", label: "Meta zamknięta" },
    ],
  },
  {
    id: "4",
    title: "Mistrzostwa Beskidu",
    date: "2026-04-12T09:00:00+02:00",
    raceStartTime: "2026-04-12T09:00:00+02:00",
    location: "Beskid Śląski, Szczyrk",
    googleMapsUrl: "https://maps.google.com/?q=Szczyrk+Beskid+Slaski",
    status: "finished",
    mapImageUrl: null,
    categories: [
      { name: "Low", spotsTotal: 40, spotsTaken: 40 },
      { name: "Medium", spotsTotal: 40, spotsTaken: 40 },
      { name: "High", spotsTotal: 40, spotsTaken: 40 },
    ],
    schedule: [
      { time: "07:30", label: "Otwarcie biura zawodów" },
      { time: "08:30", label: "Odprawa sędziowska" },
      { time: "09:00", label: "START", note: "Kategorie startują osobno co 3 minuty" },
      { time: "13:00", label: "Dekoracja i zamknięcie zawodów" },
    ],
    results: [
      {
        category: "Low",
        entries: [
          { rank: 1, name: "Anna Wiśniewska", time: "00:41:12", dsq: false },
          { rank: 2, name: "Tomasz Lis", time: "00:42:48", dsq: false },
          { rank: 3, name: "Karolina Mazur", time: "00:44:03", dsq: false },
          { rank: 4, name: "Marta Sosna", time: "DSQ", dsq: true },
        ],
      },
      {
        category: "Medium",
        entries: [
          { rank: 1, name: "Marek Nowak", time: "00:59:07", dsq: false },
          { rank: 2, name: "Joanna Kruk", time: "01:01:15", dsq: false },
          { rank: 3, name: "Bartek Zięba", time: "01:04:32", dsq: false },
          { rank: 4, name: "Adam Lis", time: "DSQ", dsq: true },
        ],
      },
      {
        category: "High",
        entries: [
          { rank: 1, name: "Jan Kowalski", time: "01:18:11", dsq: false },
          { rank: 2, name: "Paweł Sokół", time: "01:19:44", dsq: false },
          { rank: 3, name: "Magda Jeleń", time: "01:23:02", dsq: false },
          { rank: 4, name: "Iga Wilk", time: "DSQ", dsq: true },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Bieg Mazurski o Kompas",
    date: "2026-06-08T11:00:00+02:00",
    raceStartTime: "2026-06-08T11:00:00+02:00",
    location: "Mikołajki, okolice jeziora Łuknajno",
    googleMapsUrl: "https://maps.google.com/?q=Mikolajki+Luknajno",
    status: "open",
    mapImageUrl: null,
    categories: [
      { name: "Low", spotsTotal: 35, spotsTaken: 7 },
      { name: "Medium", spotsTotal: 35, spotsTaken: 14 },
      { name: "High", spotsTotal: 35, spotsTaken: 34 },
    ],
    schedule: [
      { time: "09:30", label: "Otwarcie miasteczka zawodów" },
      { time: "10:30", label: "Wydawanie pakietów i numerów" },
      { time: "11:00", label: "START", note: "Start wspólny przy pomoście" },
      { time: "14:00", label: "Wręczenie nagród" },
    ],
  },
  {
    id: "6",
    title: "Rodzinny Piknik z Mapą",
    date: "2026-06-29T12:00:00+02:00",
    raceStartTime: "2026-06-29T12:00:00+02:00",
    location: "Lasek Bielański, Warszawa",
    googleMapsUrl: "https://maps.google.com/?q=Lasek+Bielanski+Warszawa",
    status: "closed",
    mapImageUrl: null,
    categories: [
      { name: "Low", spotsTotal: 60, spotsTaken: 60 },
      { name: "Medium", spotsTotal: 30, spotsTaken: 30 },
      { name: "High", spotsTotal: 15, spotsTaken: 15 },
    ],
    schedule: [
      { time: "10:30", label: "Otwarcie strefy rodzinnej" },
      { time: "11:30", label: "Instruktaż dla początkujących" },
      { time: "12:00", label: "Start rodzinny", note: "Trasa rekreacyjna" },
      { time: "15:00", label: "Zakończenie pikniku" },
    ],
  },
];
