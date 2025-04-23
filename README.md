# Todo List App (Vue + Hono)

This is a simple Todo List web application built as a monorepo for local development and experimentation. It features a Vue frontend interacting with a Hono backend running on a locally simulated Cloudflare Workers environment with a local D1 database.

**This project is intended for local development only and is not set up for deployment.**

## Tech Stack

This project utilizes a modern tech stack within a `pnpm` monorepo structure:

**Frontend (`/client`):**

- **Framework:** [Vue 3](https://vuejs.org/) (powered by [Vite](https://vitejs.dev/))
- **Data Fetching/Server Cache:** [Tanstack Query (Vue Query)](https://tanstack.com/query/latest/docs/vue/overview)
- **UI Components:** [Shadcn-vue](https://www.shadcn-vue.com/) (using [Tailwind CSS](https://tailwindcss.com/))
- **Data Table Management:** [TanStack Table (Vue Table)](https://tanstack.com/table/v8/docs/guide/introduction)
- **Language:** TypeScript

**Backend (`/server`):**

- **Runtime:** [Cloudflare Workers](https://workers.cloudflare.com/) (Simulated locally via `wrangler dev`)
- **Web Framework:** [Hono](https://hono.dev/)
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/) (Simulated locally via SQLite)
- **Query Builder:** [Kysely](https://kysely.dev/) (with `kysely-d1` dialect)
- **Language:** TypeScript

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Node.js:** (LTS version recommended) - [Download Node.js](https://nodejs.org/)

    ```bash
    node -v
    ```

2.  **pnpm:** (Used for package management in this monorepo)

    ```bash
    npm install -g pnpm
    pnpm -v
    ```

3.  **Wrangler CLI:** (Cloudflare's CLI for Workers development)

    ```bash
    npm install -g wrangler
    wrangler --version
    ```

## Getting Started

Follow these steps to set up the project locally:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/francis1009/todo-list-vue
    cd todo-list-vue
    ```

2.  **Install Frontend Dependencies:**
    Navigate into the `client` directory and install its dependencies.

    ```bash
    cd client
    pnpm install
    cd ..
    ```

3.  **Install Backend Dependencies:**
    Navigate into the `server` directory and install its dependencies.

    ```bash
    cd server
    pnpm install
    cd ..
    ```

4.  **Set Up Local Database:**
    This initializes the necessary tables on your local Cloudflare D1 instance.

    ```bash
    cd server
    pnpm migrate
    cd ..
    ```

    _Note: You only need to run this initially._

## Running the Application (Development Mode)

Since this is a monorepo with a separate frontend and backend, you need to run both development servers concurrently. **Open two separate terminal windows/tabs** in the root project directory.

**Terminal 1: Start the Backend API Server**

- Navigate to the `server` directory and start the backend development server using `wrangler dev`.

  ```bash
  cd server
  # Assuming you have a 'dev' script in server/package.json like: "dev": "wrangler dev"
  pnpm dev
  ```

- The API server will typically start on `http://localhost:8787`.

**Terminal 2: Start the Frontend Development Server**

- Navigate to the `client` directory and start the frontend development server using Vite.

  ```bash
  cd client
  # Assuming you have a 'dev' script in client/package.json like: "dev": "vite"
  pnpm dev
  ```

- The frontend server will typically start on `http://localhost:5173`.

**Access the Application:**

- Once both servers are running, open your web browser and navigate to:
  **`http://localhost:5173`**

You should now see the Todo List application running locally! The frontend will make requests to the backend API (proxied via Vite's config in `client/vite.config.ts`) running on port `8787`.
