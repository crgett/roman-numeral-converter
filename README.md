# Roman Numeral Converter

Web application that converts numbers to Roman numerals.

The app includes an Express backend and React frontend that utilizes components from the [Adobe React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html) library. Both were written with `Typescript` to prevent runtime errors and improve development experience. Below are some dependencies, frameworks, and technologies that I decided to leverage and why I chose to use them.

**Backend**

- `Nodemon` - Speeds up development by automatically restarting the node application when file changes are detected.
- `Jest` - Standard test framework that I have used in the past.
- `OpenTelemetry` - Popular tool for gathering traces that has easy integration with Express.
- `Jaeger` - Simple integration with OpenTelemetry to import and visualize trace data for analysis.
- `Prometheus` - Straightforward tool for metric collection that includes a web dashboard.
- `Winston` - Flexible logging library common in Node.js apps.

**Frontend**

- `Parcel` - Popular build tool that is easy to set up and was mentioned to work well with Adobe React Spectrum in their documentation.
- `Jest` - Simple test framework that is also used by Adobe React Spectrum.
- `Prettier` - Helpful to ensure consistent code formatting that, in my opinion, can be especially useful for React development.

## Conversion Logic

The Roman numeral conversion in this app follows the `Standard form` format described on [Wikipedia](https://en.wikipedia.org/wiki/Roman_numerals).

_Note_ - The `backend/src/utils/romanNumeralConverter.ts` file contains the function responsible for converting a given number to Roman numerals, along with a detailed explanation of the logical approach used to perform the transformation.

## Prerequisites

The following needs to be installed locally to build and run the app.

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

_Note_ - `docker-compose` is included with Docker Desktop.

## Running the App

**Docker**

```bash
cd <your_path_to>/roman-numeral-converter
docker-compose up --build
```

- Web UI - http://localhost:1234
- Backend API - http://localhost:3000/romannumeral?query={number}

_Note_ - This application can be developed entirely using Docker and a text editor. The backend supports hot reloading with `Nodemon` when files change, however the frontend does not currently hot reload. `Parcel` supports hot reloading, but for some reason (unknown to me) file changes are not triggering rebuilds with the current configuration.

**Independently**

Both the backend and frontend can be run independently with the following command.

```bash
cd <frontend | backend>
npm install
npm run dev
```

_Note_ - You will need to have [Node.js](https://nodejs.org/en) installed locally to run `npm` commands.

## Testing

The backend and frontend have independent tests that can be run with the following command.

```bash
cd <frontend | backend>
npm run test
```

## Logs

Logs are output to the console and written to the `app.log` file under the `/logs` directory. The logging level can be switched to `debug` when necessary to view some additional logs that may be helpful.

## Metrics

**Prometheus** - http://localhost:9090

Metrics can be queried through the Prometheus client. The following are custom metrics to view API performance.

- `app_errors_count` - total number of application errors.
- `unexpected_digit_count` - total number of times the converter encounters a digit outside of 1 to 9.
- `app_successes_count` - total number of successful (errorless) application calls.

## Traces

**Jaeger** - http://localhost:16686

Traces are visible through the Jaeger UI. The following are `Tags` that can be searched to view network activity for the `express-backend` service.

- `http.status_code=200` - query successful network calls.
- `http.status_code=400` - query for server errors.

## API Example

```
GET /romannumeral?query=1234
Response: { "input": "1234", "output": "MCCXXXIV" }

GET /romannumeral?query=ope
Response: { "error": "Invalid query string: ope" }
```

## Optimizations

- I hardcoded some environment variables that typically wouldn't be kept directly in the code - such as URL paths (host and port) and logging level. These values should be read from environment variables or a `.env` file so they can be configured without modifying the codebase.
- Monitors should be configured on key metrics - specifically `app_errors_count` and `unexpected_digit_count` - to alert developers when system performance degrades.
