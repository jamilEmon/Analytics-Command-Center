### Project Overview

The Analytics Command Center is a web-based dashboard designed to provide real-time client metrics and performance insights. It visualizes data from a Google Sheet, presenting it in an intuitive and interactive user interface. The application is built with a modern frontend stack, emphasizing performance, type safety, and a polished user experience.

### Key Features

- __Real-time Data:__ The dashboard automatically fetches the latest data from a Google Sheet every 60 seconds, ensuring the displayed metrics are always up-to-date.
- __Interactive Visualizations:__ The application uses a variety of charts and graphs to represent data, including revenue trends, headshot counts, and client status funnels.
- __Key Performance Indicators (KPIs):__ At a glance, users can see important metrics like total revenue, total clients, total headshots, and the average price per client.
- __Client Data Table:__ A detailed table provides a comprehensive view of all client data, allowing for easy sorting and filtering.
- __Theming:__ The application supports light and dark modes, with a toggle to switch between them.
- __ChatBot:__ A chatbot is integrated into the dashboard, providing an interactive way to get information and insights from the data.

### Technology Stack

- __Frontend Framework:__ React with TypeScript
- __Build Tool:__ Vite
- __Styling:__ Tailwind CSS
- __Data Visualization:__ Recharts
- __Animation:__ Framer Motion
- __Backend Service:__ n8n for orchestrating multi-step AI workflows.
- __Data Fetching:__ The application fetches data from a public Google Sheet by exporting it as a CSV file.
- __CSV Parsing:__ Papaparse is used to parse the CSV data into a usable JSON format.

### Project Architecture

The application follows a component-based architecture, with a clear separation of concerns.

1. __`main.tsx`:__ The entry point of the application, which renders the main `App` component.

2. __`App.tsx`:__ The root component that sets up the `ThemeProvider` and renders the `ThemeToggle` and `Dashboard` components.

3. __`Dashboard.tsx`:__ The core component of the application. It's responsible for:

   - Fetching and managing the data from the Google Sheet.
   - Calculating KPIs.
   - Passing the data to the various presentational components.

4. __`googleSheets.ts`:__ A service that handles the logic for fetching and parsing the data from the Google Sheet.

5. __Components:__ The `components` directory contains a set of reusable UI components, each responsible for a specific part of the dashboard's functionality:

   - `KPICard`: Displays a single key performance indicator.
   - `RevenueChart`: A chart that visualizes revenue trends.
   - `HeadshotsChart`: A chart that visualizes the number of headshots.
   - `StatusFunnel`: A funnel chart that shows the distribution of clients by status.
   - `ClientTable`: A table that displays detailed client information.
   - `ChatBot`: An interactive chatbot.
   - `ThemeToggle`: A button to switch between light and dark themes.

### Data Flow

1. The `Dashboard` component mounts and triggers the `fetchGoogleSheetData` function from the `googleSheets.ts` service.
2. The `fetchGoogleSheetData` function sends a request to the Google Sheet URL, which returns the data in CSV format.
3. The CSV data is then parsed into an array of JSON objects using Papaparse.
4. The parsed data is returned to the `Dashboard` component and stored in its state.
5. The `Dashboard` component re-renders, passing the data down to its child components (`KPICard`, `RevenueChart`, etc.) as props.
6. The child components then use this data to render the appropriate visualizations.
7. This process is repeated every 60 seconds to ensure the data is fresh.

### Project Diagram

This diagram illustrates the flow of data and control within the application, from the entry point to the individual components that make up the dashboard.
graph TD
    A[main.tsx] --> B(App.tsx);
    B --> C{ThemeProvider};
    C --> D[ThemeToggle.tsx];
    C --> E[Dashboard.tsx];
    E --> F(googleSheets.ts);
    F --> G[Google Sheet];
    E --> H[KPICard.tsx];
    E --> I[RevenueChart.tsx];
    E --> J[HeadshotsChart.tsx];
    E --> K[StatusFunnel.tsx];
    E --> L[ClientTable.tsx];
    E --> M[ChatBot.tsx];



