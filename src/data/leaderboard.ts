export type Category = "Low" | "Medium" | "High";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  club: string;
  punches: string;
  time: string;
  dsq?: boolean;
}

export const leaderboard: Record<Category, LeaderboardEntry[]> = {
  Low: [
    {
      rank: 1,
      name: "Anna Wiśniewska",
      club: "KS Kompas Warszawa",
      punches: "6/6 PK",
      time: "00:24:11",
    },
    { rank: 2, name: "Tomasz Lis", club: "OK Beskid", punches: "6/6 PK", time: "00:25:42" },
    { rank: 3, name: "Karolina Mazur", club: "OK Bory", punches: "6/6 PK", time: "00:27:03" },
    { rank: 4, name: "Piotr Dąb", club: "KS InO", punches: "5/6 PK", time: "DSQ", dsq: true },
    { rank: 5, name: "Marta Sosna", club: "OK Mazury", punches: "6/6 PK", time: "00:31:18" },
  ],
  Medium: [
    { rank: 1, name: "Marek Nowak", club: "OK Bory", punches: "8/8 PK", time: "00:42:07" },
    {
      rank: 2,
      name: "Joanna Kruk",
      club: "KS Kompas Warszawa",
      punches: "8/8 PK",
      time: "00:43:55",
    },
    { rank: 3, name: "Bartek Zięba", club: "OK Beskid", punches: "8/8 PK", time: "00:44:12" },
    { rank: 4, name: "Ewa Sokół", club: "OK Mazury", punches: "8/8 PK", time: "00:46:30" },
    { rank: 5, name: "Adam Lis", club: "KS InO", punches: "7/8 PK", time: "DSQ", dsq: true },
    { rank: 6, name: "Michał Buk", club: "OK Bory", punches: "8/8 PK", time: "00:51:09" },
  ],
  High: [
    { rank: 1, name: "Jan Kowalski", club: "KS InO", punches: "9/9 PK", time: "01:02:14" },
    { rank: 2, name: "Paweł Sokół", club: "OK Beskid", punches: "9/9 PK", time: "01:04:48" },
    { rank: 3, name: "Magda Jeleń", club: "OK Bory", punches: "9/9 PK", time: "01:06:22" },
    {
      rank: 4,
      name: "Krzysztof Dzik",
      club: "KS Kompas Warszawa",
      punches: "9/9 PK",
      time: "01:09:07",
    },
    { rank: 5, name: "Iga Wilk", club: "OK Mazury", punches: "8/9 PK", time: "DSQ", dsq: true },
    { rank: 6, name: "Rafał Sosna", club: "OK Beskid", punches: "9/9 PK", time: "01:14:50" },
    { rank: 7, name: "Łukasz Brzoza", club: "KS InO", punches: "9/9 PK", time: "01:18:33" },
  ],
};
