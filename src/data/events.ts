export type Category = "Low" | "Medium" | "High";

export interface OrienteeringEvent {
  id: string;
  title: string;
  location: string;
  date: string; // display string
  status: string;
  categories: Category[];
}

const ALL: Category[] = ["Low", "Medium", "High"];

export const events: OrienteeringEvent[] = [
  {
    id: "1",
    title: "Nocny Bieg o Puchar Lasu",
    location: "Puszcza Kampinoska",
    date: "12 maja 2026, 21:00",
    status: "Otwarte zapisy",
    categories: ALL,
  },
  {
    id: "2",
    title: "Wiosenny Sprint Miejski",
    location: "Wrocław, Park Szczytnicki",
    date: "18 maja 2026, 10:00",
    status: "Otwarte zapisy",
    categories: ALL,
  },
  {
    id: "3",
    title: "Mistrzostwa Beskidu",
    location: "Beskid Śląski, Szczyrk",
    date: "1 czerwca 2026, 09:00",
    status: "Otwarte zapisy",
    categories: ALL,
  },
  {
    id: "4",
    title: "Bieg Mazurski o Kompas",
    location: "Mikołajki",
    date: "8 czerwca 2026, 11:00",
    status: "Otwarte zapisy",
    categories: ALL,
  },
  {
    id: "5",
    title: "Bory Tucholskie Ultra",
    location: "Tuchola",
    date: "22 czerwca 2026, 07:00",
    status: "Wkrótce",
    categories: ALL,
  },
  {
    id: "6",
    title: "Rodzinny Piknik z Mapą",
    location: "Lasek Bielański, Warszawa",
    date: "29 czerwca 2026, 12:00",
    status: "Otwarte zapisy",
    categories: ALL,
  },
];
