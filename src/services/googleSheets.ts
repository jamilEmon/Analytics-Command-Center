import Papa from 'papaparse';

export interface ClientData {
  Clients: string;
  'No. of Headshots': string;
  Price: string;
  Status: string;
  Email: string;
}

export interface ParsedClientData {
  client: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1fBDiqwgCS3H287aDTMKEofFazohIUPeRnwPk8WLPFZU/export?format=csv';

export const fetchGoogleSheetData = async (): Promise<ParsedClientData[]> => {
  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<ClientData>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData: ParsedClientData[] = results.data.map((row) => ({
            client: row.Clients || '',
            headshots: parseInt(row['No. of Headshots']) || 0,
            price: parseFloat(row.Price.replace(/[^0-9.-]+/g, '')) || 0,
            status: row.Status || '',
            email: row.Email || '',
          }));
          resolve(parsedData);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
};
