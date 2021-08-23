# Instagram data scraper

Instagram data scraper collecting profile info and images from particular instagram profile, and then represents data on your local react app.

## Installation

Clone this repo to your machine (the app can be found on the main branch).

Navigate to client folder of this project.

Open terminal, enter "npm install", and wait client project dependencies installation.

```bash
cd client
npm install
```

Navigate to server folder of this project.

Open terminal, enter "npm install", and wait server project dependencies installation.

```bash
cd server
npm install
```

Note: When you install Puppeteer (that can be found in the list of dependencies), it downloads a recent version of Chromium (~170MB Mac, ~282MB Linux, ~280MB Win) that is guaranteed to work with the API.

In terminal, from server folder enter "npm start [instagram name]". Replace [instagram name] with instagram name of profile that you want to scrape. Example:

```bash
npm start utopiantravel
```

## Usage

Visit http://localhost:8000. This will start your scraper.

## Note

I decided to get data via DOM Scraping over the Public Http Calls for a few reasons:

Since I don't have much experience with scraping with Public HTTP Calls, I wasn't sure that I would be able to provide all authentication data for request headers.

The amount of different data for scrape was'n too big, so this approach was quite simple.

I chose Pupppeteer as a tool for scrape because I was able to use it for login on instagram, as well.

Thank you for your time!
