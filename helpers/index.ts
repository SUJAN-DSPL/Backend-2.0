// * helpers functions

import { CountryCodeType } from "@/types";

export const arraySum = (array: Array<number>): number => {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};

export function groupBy<T>(array: T[], key: keyof T): T[][] {
  const grouped: { [key: string]: T[] } = {};

  array.forEach((item) => {
    const groupByKey = String(item[key]);
    if (!grouped[groupByKey]) {
      grouped[groupByKey] = [];
    }
    grouped[groupByKey].push(item);
  });

  return Object.values(grouped);
}

// *  static data
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const countries: Array<{
  code: CountryCodeType;
  name: string;
  image: string;
}> = [
  {
    code: "DE",
    name: "Germany",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png",
  },
  {
    code: "ES",
    name: "Spain",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Spain_%28Civil%29.svg/2560px-Flag_of_Spain_%28Civil%29.svg.png",
  },
  {
    code: "GB",
    name: "United Kingdom",
    image:
      "https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg",
  },
  {
    code: "FR",
    name: "France",
    image: "https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg",
  },
  {
    code: "IT",
    name: "Italy",
    image: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
  },
  {
    code: "NL",
    name: "Netherlands",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1280px-Flag_of_the_Netherlands.svg.png",
  },
  {
    code: "PL",
    name: "Poland",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png",
  },
  {
    code: "SE",
    name: "Sweden",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png",
  },
  {
    code: "TR",
    name: "Türkiye",
    image: "https://www.flagpictures.com/static/flags/vector/tr.svg",
  },
  {
    code: "BR",
    name: "Brazil",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png",
  },
];
