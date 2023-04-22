## Events App Test Task

### Commands:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно
  виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними
  виправленнями простих помилок

## API description

http://localhost:<PORT>

### --Auth--

- Main route = "/api/auth"
  - "/current" - (GET)
  - "/login" - (POST) @return {status, code, data: {token}}
  - "/registration" - (POST) @return {status, code, data: {token}}
  - "/logout" - (POST) @return {status, code, message}

### --Authors--

---

AUTHOR SCHEMA = { \_id:"", fistName: "", lastName:"", email:"", phoneNumber: "",
totalEvents: 0, nextEventStartDate: null/"", owner: "" },

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
