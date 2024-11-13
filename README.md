# Suggestions

This is the source code for the
[Nexirift Suggestions](https://suggestions.nexirift.com) website.

This project was bootstrapped with [Create T3 App](https://create.t3.gg).

## Requirements

-   Node.js 16+
-   Bun
-   Docker or PostgreSQL
-   Authentik

## Setup

1. Clone this repository:
   `git clone https://github.com/Nexirift/suggestions.git`
2. Install dependencies: `bun install`
3. Copy the `.env.example` file to `.env` and fill in the values.
4. Setup the database connection:
    - Docker: run `./start-database.sh` to start the database.
    - Local: sorry i can't help, figure it out yourself.
5. Setup Drizzle schema: `bun run db:generate && bun run db:migrate`.
6. Run the app: `bun dev`.
