# CRUSH Development Guidelines

## Build Commands
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Create production build
- `npm run start` - Start production server locally

## Linting and Type Checking
- `npm run lint` - Run ESLint to check for code style issues
- `npm run type-check` - Run TypeScript compiler to check for type errors (tsc --noEmit)

## Testing Commands
- `npm run test` - Run all Playwright end-to-end tests
- `npm run test:ui` - Run Playwright tests with UI interface
- `npm run test:headed` - Run Playwright tests in headed mode
- `npm run health-check` - Run site health check script
- `npm run performance-test` - Run performance-focused Playwright tests

### Running a Single Test
To run a specific test file:
`npx playwright test path/to/test-file.test.ts`

To run a specific test by name:
`npx playwright test -g "test name pattern"`

## Code Style Guidelines

### Imports
- Use absolute imports with `@/*` alias for src directory
- Group imports in order: React/core, external libraries, internal modules, relative imports
- Use named imports when possible: `import { cn } from "@/lib/utils"`
- Import CSS files before component logic
- Keep imports organized alphabetically within each group

### Formatting
- Use Prettier defaults with 2-space indentation
- Use semicolons consistently
- Use single quotes for strings
- Trailing commas in multi-line objects/arrays
- Line width max 100 characters

### Component Structure
- Use functional components with TypeScript interfaces
- Define props interfaces above the component
- Use React hooks (useState, useEffect, etc.) at the top of components
- Use Tailwind CSS utility classes for styling
- Use shadcn/ui components when available
- Use data-testid attributes for e2e testing

### Types
- Define prop interfaces for all components
- Use TypeScript types for function parameters and return values
- Prefer interfaces over types for object structures
- Use React.FC<Props> for component typing
- Use proper event typing (React.MouseEvent, React.FormEvent, etc.)

### Naming Conventions
- Components: PascalCase (Button, Header, CrosswordDisplay)
- Files: camelCase or kebab-case matching component name (button.tsx, header.tsx)
- Variables: camelCase (userState, puzzleData)
- Constants: UPPER_CASE (MAX_PUZZLE_SIZE, API_ENDPOINTS)
- Functions: camelCase (handleClick, fetchPuzzleData)

### Error Handling
- Always handle API errors gracefully
- Use try/catch blocks for asynchronous operations
- Display user-friendly error messages
- Log errors appropriately for debugging
- Handle loading states for async operations

### React Patterns
- Use functional components with hooks
- Use context for global state management
- Break down complex components into smaller ones
- Use custom hooks for reusable logic
- Implement proper cleanup in useEffect

### Styling
- Use Tailwind CSS utility classes
- Use shadcn/ui components for consistent UI
- Use the `cn` utility function for conditional classes
- Use CSS variables for theming when needed
- Follow mobile-first responsive design

### Testing
- Use Playwright for end-to-end testing
- Test critical user flows
- Test error states and edge cases
- Use data-testid attributes for test selectors
- Monitor performance metrics (page load times, API response times)

### Performance
- Implement lazy loading for large components
- Use React.memo for components that render frequently
- Optimize images and assets
- Monitor bundle size
- Use proper useCallback/useMemo for expensive operations
- Implement proper pagination for data lists

## Project Overview

This is a comprehensive puzzle generation and discovery platform designed to handle massive scale puzzle libraries with intelligent search and user engagement features. The platform currently manages 77,555+ puzzles (38,680 word search + 38,875 crossword) with advanced discovery capabilities.

## Architecture & Technology Stack

### Frontend Technologies
- **Framework**: Next.js 14.2.27 (React-based)
- **UI Libraries**: Chakra UI, Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Notifications**: Sonner for toast notifications

### Backend Technologies
- **Runtime**: Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes (RESTful)
- **File Processing**: Custom TypeScript utilities

### Database Schema
Core Models:
- User (id, email, createdAt, relations)
- WordSearch (id, title, theme, difficulty, words, grid, solution)
- Crossword (id, title, theme, difficulty, clues, grid, solution)
- PuzzleBook (id, title, bookType, theme, difficulty, puzzles)

## Current Implementation Status

### Fully Implemented Features
1. Enhanced Search System with smart keyword matching and semantic-like discovery
2. Functional Favorites System with localStorage persistence
3. Enhanced Puzzle Library UI with search suggestions and filtering
4. Complete Data Pipeline with 100% success rate for all 77,555 puzzles
5. Production-Ready Infrastructure with clean build and SEO optimization

### Not Yet Implemented (Advanced AI Features)
1. Vector Embeddings & True Semantic Search
2. Graph Database & Relationships
3. RAG-Powered Recommendations
4. Full Database Integration

## Key Components and Functionality

### Core Components
- **InteractiveWordSearch.tsx**: Playable word search game engine with grid interaction, word selection mechanics, timer and scoring system
- **InteractiveCrossword.tsx**: Playable crossword game engine with grid navigation, clue display and input validation
- **Layout.tsx**: Main application wrapper with navigation
- **Dashboard.tsx**: Main user interface for puzzle management

### State Management
The application uses React hooks for state management:
- Complex local state with multiple dialogs in Dashboard
- Context API for global state (AuthContext for authentication)
- Functional state updates with proper cleanup to avoid memory leaks

### Data Flow Patterns
1. **Create Flow**: User → Dashboard → API → Database → Response
2. **Search Flow**: User → Search Interface → Vector Search → Filtered Results
3. **Play Flow**: User → Game Component → Local State → Completion API
4. **Book Flow**: User → Book Library → Collection API → Puzzle Aggregation

## API Layer

### Core API Routes
- `/api/word-search/create` - POST to create new word search
- `/api/word-search/list` - GET to list user's word searches
- `/api/crossword/list` - GET to list user's crosswords
- `/api/search/smart` - POST for enhanced search functionality
- `/api/favorites/*` - Favorites management
- `/api/recommendations/*` - Personalized suggestions

### API Error Handling
All API routes follow consistent error handling patterns:
- Method validation (405 for wrong methods)
- Authentication checks (401 for unauthorized)
- Input validation (400 for bad requests)
- Database error handling with specific error messages
- Generic server error handling (500 for internal errors)

## Performance Optimization Patterns

### React Performance
- Memoization for expensive computations in dashboard filtering
- Callback memoization for event handlers
- Proper cleanup in useEffect to prevent memory leaks
- Efficient pagination patterns for large data sets

### Database Query Optimization
- Efficient pagination with skip/take patterns
- Selective field retrieval to reduce payload size
- Parallel queries using Promise.all where appropriate
- Strategic database indexing

## Authentication Flow

The application uses Supabase for authentication:
- Server-side authentication with JWT token validation
- Supabase client creation for API routes
- User-scoped database queries for data isolation
- Currently using placeholder implementations for most auth methods except signOut

## Debugging Strategies

### Common Debugging Patterns
- Strategic console logging for puzzle generation and API requests
- Error boundary implementation for React components
- Network request/response logging for API debugging
- Proper timer cleanup to prevent memory leaks
- Stale closure prevention with functional state updates

### Common Issues & Solutions
- Build failures: Check dependencies and TypeScript configurations
- Database issues: Verify connection strings and schema migrations
- Performance issues: Add indexes, optimize queries, analyze bundle sizes
- State management: Use functional updates, implement proper cleanup