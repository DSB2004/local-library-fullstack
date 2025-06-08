# Local Library Portal - Client

This is the **client-side** application of the **Local Library Portal**, built with **React**, **TypeScript**, **Vite**, **TailwindCSS**, and integrated with a backend API.

---

## Live Deployment

Visit the live version here:  
👉 **[https://local-library-portal-yxcr.vercel.app/](https://local-library-portal-yxcr.vercel.app/)**

Ensure your backend server is live and accessible to enable full functionality.

---

## Local Development Setup

Follow these steps to run the project locally:

### Clone the Repository

```bash
git clone https://github.com/DSB2004/local_library_portal.git
cd local-library-portal/client
```

### Setting Up Env

- Create a .env file in the root of the project.

- Use the .env.example file provided in the repository as a reference.

```bash
# .env
VITE_APP_BACKEND_API=http://localhost:3000

```

### Running Server Locally

#### Choose a runtime environment for typescript **bun** ,**yarn** or **npm**

#### Install dependencies:

```bash
# npm
npm install

# bun
bun i

# yarn
yarn install

```

#### Start the development server:

```bash
# npm
npm run dev

# bun
bun run dev

# yarn
yarn dev
```

#### To build and run:

```bash
# npm
npm run build

# bun
bun run build

# yarn
yarn build
```

---

## Tech Stack Used

- React with TypeScript

- Vite for blazing-fast build

- TailwindCSS for styling

- Zod for form validation

- React Hook Form for controlled inputs

- TanStack Query (React Query) for data fetching and caching
