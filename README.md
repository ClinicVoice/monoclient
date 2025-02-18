# Monoclient - ClinicVoice AI

This is the **monoclient** repository for **ClinicVoice AI**, a monolithic application encompassing all domain services in one app. The project is built using [Next.js](https://nextjs.org/) and is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies using **yarn**:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Editing the Application
You can modify the main page by editing `app/page.tsx`. The application will automatically update as you make changes.

## Project Configuration

### Backend Configuration
To test the frontend with a local backend instead of the production backend, modify the `config.ts` file:

```typescript
const isLocal = false;

export const BASE_URL = isLocal ? 'http://localhost:5050' : 'https://clinicvoice.kevinle623.online';
export const VERSION = 'v1';
```

Set `isLocal` to `true` to point to the local backend at `http://localhost:5050`.

## Linting & Formatting

This project includes linting and formatting tools to maintain code quality:

- **Linting**: Run ESLint with auto-fix enabled:
  ```bash
  yarn lint
  ```
- **Formatting**: Run Prettier to format your code:
  ```bash
  yarn format
  ```

## Technologies Used

This project uses the following libraries and frameworks:
- **[MUI](https://mui.com/)** for UI components
- **[React Query](https://tanstack.com/query/latest)** for data fetching and caching
- **[Axios](https://axios-http.com/)** for HTTP requests

## Deployment

This project is set up for **automatic deployment to Netlify** with GitHub pull request (PR) previews enabled. Each branch will generate a preview URL on Netlify for testing before merging.

For more information on Next.js deployment, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Learn More

To learn more about Next.js, check out the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial for Next.js.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Contribute and provide feedback.

## License

This project is licensed under an appropriate open-source or proprietary license (if applicable). Be sure to update this section with the actual license details.
