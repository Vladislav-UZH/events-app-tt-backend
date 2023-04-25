## Events App Test Task

###How to start

---

- Use "npm install" or "npm i" and wait for the downloading.
- Create file ".env" and add the variables contained in the .env.example.
- Use "npm start" or "npm run start:dev" to start the server and check the result message in console.
- Use "API Description" to create a requests. 


---

### Commands:

- `npm start` &mdash; starts the server in production mode
- `npm run start:dev` &mdash; starts the server in development mode (development)
- `npm run lint` &mdash; run the code check with eslint
- `npm lint:fix` &mdash; the same linter check, but with automatic
  corrections of simple errors

## API description

URL - http://localhost:PORT/api

### --Auth--

- Main route = "/api/auth"
  - "/current" - (GET) @return {status,code, message}
  - "/login" - (POST) @return {status, code, data: {token}}
  - "/registration" - (POST) @return {status, code, data: {token}}
  - "/logout" - (POST) @return {status, code, message}

### --Authors--

---

AUTHOR SCHEMA = { \_id:"", fistName: "", lastName:"", email:"", phoneNumber: "",
totalEvents: 0, nextEventStartDate: "", owner: "" },

---

- Main route = "/api/authors"

  - "/" - (GET) @return (default) {status, code, data: [{author},...]}

    - for using the pagination: "?page=<...>&limit=<...> "

  - "/:id" - (GET) @return {status, code, data: {author}}
  - "/" - (POST) @return {status, code, data: {author}}
  - "/:id" - (DELETE) @return {status, code, message}

### --Events--

---

EVENT SCHEMA = { \_id:"", title: "", description:"", startDate:"", endDate:"",
owner: "" },

---

- Main route = "/api/events"

  - "/author/:id" - (GET) @return {status, code, data: [{event}...]}

    - for using the pagination: "?page=<...>&limit=<...> "

  - "/:id" - (GET) @return {status, code, data: {event}}
  - "/author/:id" - (POST) @return {status, code, data: {event}}
  - "/:id" - (DELETE) @return {status, code, message}
