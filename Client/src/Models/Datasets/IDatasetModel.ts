export interface IDataPoint {
  x: number,
  y: number
}

export interface IDatasetModel {
  points: IDataPoint[],
  id: number,
  color: string,
  name: string,
  title: string,
  oxidizer: string,
  subcategory: string,
  category: string,
  diluent: string,
  year: string,
  fuel: string,
  author: string,
  outputFormat: string,
}

export const exampleDatasets: IDatasetModel[] = [{
  color: "#3632ff",
  id: 0,
  points: [{ x: 5.1, y: 3.5 }, { x: 4.9, y: 3 }, { x: 4.7, y: 3.2 }, { x: 4.6, y: 3.1 }, { x: 5, y: 3.6 }, { x: 5.4, y: 3.9 }],
  name: "Robert Walker Jr.",
  title: "Cornelis van der Aa",
  oxidizer: "Kyle Chipchura",
  subcategory: "Amy Redford",
  category: "Shea Hillenbrand",
  diluent: "Susumu Kurobe",
  year: "Hannu-Pekka Hänninen",
  fuel: "Gwen Taylor",
  author: "Hugh Green",
  outputFormat: "Sheila Sherwood"
}, {
  color: "#f20b34",
  id: 1,
  points: [{ x: 3, y: 8 }, { x: 9, y: 7 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 8, y: 1 }],
  name: "Kay Boyle",
  title: "Eduardo Xol",
  oxidizer: "Aljin Abella",
  subcategory: "Tracy Shaw",
  category: "Alexandre Dumas",
  diluent: "Neleh Dennis",
  year: "Tim Kinsella",
  fuel: "Karloff Lagarde",
  author: "Paul Haarhuis",
  outputFormat: "Empress Schuck"
}, {
  color: "#7af684",
  id: 2,
  points: [{ x: 7, y: 6 }, { x: 2, y: 5 }, { x: 7, y: 9 }, { x: 4, y: 1 }, { x: 6, y: 7 }],
  name: "Cris Kirkwood",
  title: "Owais Shah",
  oxidizer: "Kellie Waymire",
  subcategory: "Justin Fashanu",
  category: "Vasilios Magginas",
  diluent: "Nelson Pereira dos Santos",
  year: "Géza Kiss",
  fuel: "Sheila Sherwood",
  author: "Eduardo Xol",
  outputFormat: "Diarmuid O'Sullivan"
}, {
  color: "#000000",
  id: 3,
  points: [{ x: 3, y: 7 }, { x: 1, y: 9 }, { x: 8, y: 7 }, { x: 1, y: 4 }, { x: 8, y: 5 }],
  name: "Francine",
  title: "Tiphaigne de la Roche",
  oxidizer: "Bert Trautmann",
  subcategory: "Sat Mahajan",
  category: "Julian McMahon",
  diluent: "Helen Svedin",
  year: "Jahidi White",
  fuel: "Gwen Taylor",
  author: "Giannis Milonas",
  outputFormat: "Charlotte Corday"
}]