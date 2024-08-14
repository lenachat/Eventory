# Eventory

## Project Overview

**Eventory** is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) approach. The application integrates with the Google Calendar API to fetch and display upcoming events in various cities. It includes features such as offline functionality, responsive design, and data visualization through charts.

## Features

- **Filter Events by City:** Users can search for and filter events based on city names.
- **Show/Hide Event Details:** Users can expand or collapse event details.
- **Specify Number of Events:** Users can specify how many events they want to view.
- **Offline Usage:** The app can be used offline, showing cached data when there is no internet connection.
- **Add to Home Screen:** Users can install the app on their device's home screen.
- **Data Visualization:** Includes charts that display the number of upcoming events by city and the popularity of event genres.

## Technical Requirements

- Built as a **React** application.
- Developed using **TDD (Test-Driven Development)**.
- Uses the **Google Calendar API** with OAuth2 authentication.
- Hosted on **GitHub Pages** with a serverless backend powered by **AWS Lambda**.
- Responsive design that works on various devices and screen sizes, including mobile and tablet.
- Passes **Lighthouse's PWA** checklist for performance and accessibility.
- Implements a **service worker** to ensure offline functionality.
- Monitored using an **online performance monitoring tool**.
- Test coverage of at least 90%.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/lenachat/Eventory.git
   cd Eventory
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the app locally:
   ```bash
   npm start
   ```

4. To run tests:
   ```bash
   npm test
   ```

## Deployment

The app is deployed on GitHub Pages and can be accessed at https://lenachat.github.io/Eventory

## Usage

- Search for events in your desired city.
- Click on an event to view more details or hide them.
- Specify the number of events you'd like to see.
- Use the app offline and add it to your home screen for easy access.

## Data Visualization

The app includes two primary visualizations:
- **Scatterplot:** Displays the number of upcoming events per city.
- **Pie Chart:** Shows the popularity distribution of event genres.
