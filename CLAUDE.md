# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ExportComments Frontend** is a Next.js (App Router, SSR) TypeScript web application for managing design comments, feedback, and prototypes exported from Figma. It provides a dashboard for viewing projects, filtering comments, managing team members, and viewing flow versions. Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4 using the Intelligaia design tokens.

## Quick Start

### Prerequisites
- Node.js v14+ (LTS recommended)
- npm or yarn
- Access to backend API (typically runs on `http://localhost:3000`)

### Setup & Running

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint (next + prettier + import sort)
npm run typecheck  # tsc --noEmit
```

Environment variables (see `src/constants/AppConstant.ts`): `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_KOA2_BASE_URL`, `NEXT_PUBLIC_USE_DEV_ENV`.

## Stack notes

- **Routing**: Next.js App Router under `src/app/` (same URLs as before). Route guards live in `src/proxy.ts` (cookie `userToken`), not in components. Legacy views are in `src/screens/` (not `pages/`, which Next reserves).
- **Auth**: JWT is stored in localStorage *and* mirrored to the `userToken` cookie (`AuthService`) so the server can redirect and render.
- **Styling**: Tailwind v4, tokens in `src/app/globals.css` (`@theme`). No MUI, no styled-components. Reusable primitives are in `src/components/ui/` (Button, Modal, Drawer, Popover/Menu, Tooltip, Combobox, DataTable, Carousel, ...). Headless UI is used for Dialog behaviour.
- **Data**: `@tanstack/react-query` v5; per-query `onSettled` is provided by `useQueryWithSettled` (`src/hooks/queryUtils.ts`).
- **Client-only**: components touching browser APIs are `"use client"`; Lottie is loaded with `next/dynamic({ ssr: false })`, exceljs with a dynamic `import()`.

## Architecture

### Overall Structure

The application follows a container/component pattern with React Context for state management:

1. **Pages** (`src/pages/`) - Top-level page components (Main, ProjectListPage, ProjectDetailsPage, etc.)
2. **Containers** (`src/containers/`) - Feature-specific components organized by domain
3. **Stories/Components** (`src/stories/components/`) - Reusable UI components with Storybook stories
4. **Hooks** (`src/hooks/`) - Custom React hooks for data fetching and business logic
5. **Contexts** (`src/contexts/`) - React Context for global state management
6. **Services** (`src/services/`) - API communication and local storage utilities
7. **Types** (`src/types/`) - TypeScript type definitions
8. **Utils** (`src/utils/`) - Utility functions (colors, common, validation, etc.)

### Routing

Routes defined in [App.tsx](src/App.tsx#L26):

- `/` - Main page (auth required)
- `/projects` - Project dashboard (private route)
- `/project/:projectId/details` - Project details page (private route)
- `/invite/:type` - Invite page (private route)
- `/users` - User information (private route)
- `/callback` - Figma OAuth callback
- `/terms-of-use` - Public page
- `/privacy-policy` - Public page
- `/unsubscribe` - Unsubscribe page
- `/feedback-form` - Feedback form page
- `*` - 404 page

**Guards:** `src/proxy.ts` redirects unauthenticated users from private paths to `/`, and authenticated users from `/` and `/callback` to `/projects`.

### State Management

Global state managed via React Context in `src/contexts/`:

- **UserContext** - Current user, auth token, file list, comment type filter
- **ProjectFilterContext** - Project filter state (date range, filter type)
- **ProjectCardContext** - Individual project card data
- **ProjectDetailsContext** - Project details page state
- **PrototypePageContext** - Prototype/flow list state
- **AddProjectContext** - Add project flow state
- **SizeContext** - Window/viewport size
- **ToasterContext** - Snackbar/toast notifications

Context consumers use custom hooks exported from `src/contexts/index.ts`.

### Data Flow

1. **API Communication**: Hooks in `src/hooks/` make HTTP requests via Axios
2. **State Updates**: Results stored in Context via setters
3. **Component Re-render**: Components subscribe to Context and re-render on updates
4. **UI Display**: Components render data from Context

### Directory Structure

```
frontend/
├── src/
│   ├── pages/                 # Page-level components
│   │   ├── Main.tsx
│   │   ├── ProjectListPage.tsx
│   │   ├── ProjectDetailsPage.tsx
│   │   ├── InvitePage.tsx
│   │   ├── FeedbackFormPage.tsx
│   │   └── ...
│   ├── containers/            # Feature-specific components
│   │   ├── Projects/          # Project list & cards
│   │   ├── ProjectDetails/    # Project detail views
│   │   ├── Prototype/         # Flow/prototype management
│   │   ├── Prototypes/        # Prototype list
│   │   ├── Comments/          # Comment display & filtering
│   │   ├── Modal/             # Modal dialogs
│   │   ├── Navigation/        # Navigation components
│   │   ├── Common/            # Common/utility containers
│   │   ├── Home/              # Home section components
│   │   ├── Invite/            # Invite flows
│   │   └── Feedback/          # Feedback form
│   ├── stories/components/    # Reusable UI components
│   │   ├── global-header/
│   │   ├── Cards/
│   │   ├── Ec*/               # ExportComments-specific components
│   │   ├── button/
│   │   ├── search/
│   │   ├── avatar/
│   │   ├── snackbar/
│   │   ├── filter-dropdown/
│   │   └── ...
│   ├── hooks/                 # Custom React hooks
│   │   ├── projectHook.ts
│   │   ├── commentHook.tsx
│   │   ├── prototypeHook.ts
│   │   ├── authHook.ts
│   │   ├── customHook.ts
│   │   └── ...
│   ├── contexts/              # React Context providers
│   │   ├── UserContext.tsx
│   │   ├── ProjectFilterContext.tsx
│   │   ├── ProjectDetailsContext.tsx
│   │   └── ...
│   ├── services/              # API & local storage
│   │   ├── AuthService.ts
│   │   └── ProjectService.ts
│   ├── types/                 # TypeScript definitions
│   │   ├── project.d.ts
│   │   ├── comment.d.ts
│   │   ├── prototype.d.ts
│   │   ├── auth.d.ts
│   │   └── ...
│   ├── utils/                 # Utility functions
│   │   ├── colors.ts
│   │   ├── common.ts
│   │   ├── validation.ts
│   │   ├── icons.tsx
│   │   ├── messages.ts
│   │   └── ...
│   ├── route/                 # Route components
│   │   ├── AuthRoute.tsx
│   │   └── PrivateRoute.tsx
│   ├── constants/
│   │   └── AppConstant.ts
│   ├── mocks/
│   │   └── projectMocks.ts
│   ├── App.tsx                # Main app component
│   └── index.tsx              # Entry point
├── public/
├── build/                     # Production build output
├── .storybook/                # Storybook config
├── package.json
├── tsconfig.json
└── .eslintrc.json
```

## Key Concepts

### Hooks (Custom Data Fetching)

Hooks in `src/hooks/` encapsulate API calls and state management:

- **projectHook.ts** - Project list, details, creation, deletion, favorites
- **commentHook.tsx** - Comment fetching, filtering, status updates
- **prototypeHook.ts** - Flow/prototype fetching, versioning, creation
- **pageHook.ts** - Page data fetching
- **flowHook.ts** - Flow data fetching
- **authHook.ts** - Authentication, token validation, login/logout
- **filesHook.ts** - File/project import from Figma
- **usersHook.ts** - User management, invitations
- **commonHook.ts** - Shared utilities
- **customHook.ts** - Other custom logic

Each hook returns data, loading states, and error handling.

### Components Structure

**Page Components** (src/pages/) - Orchestrate features and compose containers/components
- Handle routing params
- Initialize data fetching
- Layout management

**Container Components** (src/containers/) - Feature-specific, manage local state for a domain
- Project management components
- Comment display and filtering
- Prototype/flow management
- Modal dialogs

**Story Components** (src/stories/components/) - Reusable, isolated UI components
- Button, Input, Card, Modal, Dialog
- Avatar, Breadcrumb, Tooltip, Popover
- ExportComments-specific components (EcButton, EcModal, EcDialog, etc.)

### Styling

- **Material-UI**: Primary component library (@mui/material)
- **Emotion**: CSS-in-JS (@emotion/react, @emotion/styled)
- **SCSS**: Custom styles in App.scss
- **Styled-components**: Some components use styled-components

Material-UI theme colors and spacing used consistently across components.

### Type Definitions

Types in `src/types/` define data structures:

- **project.d.ts** - Project, ProjectCard, Filter types
- **comment.d.ts** - Comment, CommentThread types
- **prototype.d.ts** - Flow, Page, FlowVersion types
- **auth.d.ts** - User, Token, Auth types
- **user.d.ts** - User profile types
- **common.d.ts** - Common types (Status, Response wrappers)

All `.d.ts` files are exported via `src/types/index.ts`.

### Authentication

Authentication flow:

1. User logs in via Figma OAuth
2. Backend returns JWT token and user info
3. Token stored in localStorage via `AuthService`
4. Token sent in `Authorization: Bearer <token>` header on API requests
5. `checkHeaderAuthToken` middleware on backend validates token
6. `PrivateRoute` component checks token and redirects if not authenticated

AuthService methods:
- `getUser()` - Get stored user from localStorage
- `getUserToken()` - Get stored JWT token
- `setUser(user)` - Store user in localStorage
- `setUserToken(token)` - Store token in localStorage
- `clearAuth()` - Clear auth data on logout

### API Communication

**Axios instances** configured in `src/utils/interceptors.ts`:
- Base URL from environment
- JWT token added to Authorization header
- Error interceptor for handling 401 (redirect to login)
- Response interceptor for error formatting

**Error Handling**:
- API errors caught by hooks
- Error messages displayed via ToasterContext (snackbars)
- Loading states show spinners/skeletons

### Contexts & Hooks Pattern

Example usage:

```typescript
// In a component
import { useUserContext } from "../contexts";
import { useGetProjects } from "../hooks";

const MyComponent = () => {
    const { user, token } = useUserContext();
    const { data: projects, loading } = useGetProjects();
    
    if (loading) return <Loader />;
    return <div>{/* render projects */}</div>;
};
```

## Adding New Features

### Adding a New Page

1. Create page component in `src/pages/YourPage.tsx`
2. Add route to [App.tsx](src/App.tsx)
3. Create container components as needed in `src/containers/`
4. Add TypeScript types in `src/types/`
5. Create hooks for API calls in `src/hooks/`

### Adding a New Component

1. Create component in `src/stories/components/your-component/YourComponent.tsx`
2. Create Storybook story in `src/stories/components/your-component/YourComponent.stories.tsx`
3. Add TypeScript types
4. Export from `src/stories/components/index.ts`

### Adding a New Hook

1. Create hook in `src/hooks/yourHook.ts`
2. Use Axios for API calls
3. Manage loading/error states
4. Export from `src/hooks/index.ts`
5. Type the return value

### Adding a New Context

1. Create context file in `src/contexts/YourContext.tsx`
2. Define context type in `src/types/`
3. Create provider component
4. Export both context and hook for accessing it
5. Add to exports in `src/contexts/index.ts`
6. Wrap App (or specific route) with provider

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-dom` | React DOM rendering |
| `typescript` | Static typing |
| `react-router-dom` | Client-side routing |
| `@mui/material` | Component library |
| `@emotion/react`, `@emotion/styled` | CSS-in-JS |
| `@mui/icons-material` | Material Design icons |
| `axios` | HTTP client |
| `react-query` | Server state management (for caching queries) |
| `react-hook-form` | Form state management |
| `date-fns` | Date utilities |
| `moment` | Date manipulation |
| `lodash` | Utility functions |
| `styled-components` | CSS-in-JS styling |
| `react-data-grid` | Data table component |
| `react-responsive-carousel` | Carousel component |
| `emoji-js` | Emoji support |
| `exceljs`, `file-saver` | Excel file generation/download |
| `lottie-react` | Animation library |
| `survey-core`, `survey-react-ui` | Survey/form library |

## Environment Variables

Frontend uses environment variables for API configuration (typically in `.env` or via create-react-app):

- `REACT_APP_API_URL` - Backend API base URL (e.g., http://localhost:3000)
- Other env vars as needed for configuration

create-react-app automatically exposes vars prefixed with `REACT_APP_`.

## Development Workflow

1. **Start dev server**: `npm start`
2. **Component development**: Use `npm run storybook` to develop components in isolation
3. **Type checking**: `npm run tslint` checks for TypeScript errors
4. **Linting**: `npm run eslint` fixes linting issues
5. **Testing**: `npm test` runs Jest tests
6. **Build**: `npm run build` creates production build

## Building & Deployment

```bash
# Create production build
npm run build

# Build output in ./build/ directory
# Can be deployed to any static hosting (S3, Netlify, Vercel, etc.)
```

The build is optimized and minified for production.

## Testing Notes

- Storybook stories in `src/stories/components/` serve as component documentation and visual tests
- Unit tests in `src/*.test.tsx` files
- Tests run with Jest via `npm test`
- No e2e testing framework currently configured

## Common Patterns

### Fetching Data in a Component

```typescript
const MyComponent = () => {
    const { data, loading, error } = useGetProjects();
    
    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;
    return <div>{/* render data */}</div>;
};
```

### Updating Context State

```typescript
const MyComponent = () => {
    const { setUser } = useUserContext();
    
    const handleLogin = (user) => {
        setUser(user);
    };
    
    return <button onClick={() => handleLogin(newUser)}>Login</button>;
};
```

### Using React Query

```typescript
// In a hook or component
const { data, isLoading } = useQuery('projects', fetchProjects);
```

### Form Handling with react-hook-form

```typescript
const { register, handleSubmit } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('email')} />
    <button type="submit">Submit</button>
</form>
```

## Debugging Tips

- **React DevTools**: Browser extension for inspecting components and Context
- **Redux DevTools**: Some state can be inspected with Redux DevTools extension
- **Network tab**: Check API requests and responses
- **Console errors**: TypeScript and ESLint errors shown during dev server startup
- **Storybook**: Isolated component testing and manual UI verification

## Performance Considerations

- **React.memo**: Memoize components to prevent unnecessary re-renders
- **useMemo/useCallback**: Memoize expensive computations
- **Code splitting**: Pages are lazy-loaded via React.lazy (if configured)
- **Image optimization**: Images handled by webpack
- **Bundle analysis**: Use `npm run build -- --analyze` or webpack-bundle-analyzer

## Accessibility

- Material-UI components have built-in accessibility features
- ARIA labels used where needed
- Keyboard navigation supported
- Color contrast follows WCAG standards

## Browser Support

Supports modern browsers as defined in `package.json` browserslist:
- Production: >0.2% usage, not dead, not op_mini
- Development: Latest 1 version of Chrome, Firefox, Safari

