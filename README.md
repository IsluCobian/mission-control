# Mission Control

A modern, responsive web application for exploring SpaceX launch data. Built with Next.js, React, and TypeScript, featuring real-time search, pagination, and detailed launch information.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📋 Architecture & Tech Stack

### Folder Structure

The project follows a modular, feature-based organization that promotes maintainability and scalability:

```
mission-control/
├── app/                    # Next.js App Router pages and layouts
│   ├── page.tsx            # Main application page
│   ├── layout.tsx          # Root layout with providers
│   └── providers.tsx       # Global providers (React Query, Theme, etc.)
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI components (shadcn/ui)
│   ├── LaunchList.tsx      # Launch list display component
│   ├── LaunchDetails.tsx   # Detailed launch information sheet
│   ├── LaunchStats.tsx     # Statistics display
│   └── Sidebar.tsx         # Navigation sidebar
├── contexts/               # React Context providers
│   └── ImageModalContext.tsx  # Global image modal state
├── hooks/                  # Custom React hooks
│   ├── useLaunches.ts      # Data fetching hooks
│   ├── useLaunchStats.ts   # Statistics calculation
│   └── useScreenSize.ts    # Responsive breakpoint detection
├── lib/                    # Utility functions and configurations
│   ├── api.ts              # API client functions
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Helper functions
└── public/                 # Static assets
```

### Technology Choices

#### **TanStack Query (React Query)**

- **Benefits**:
  - Automatic caching and background refetching
  - Built-in loading and error states
  - Optimistic updates support
  - Reduces boilerplate compared to manual state management

#### **shadcn/ui**

- **Why**: High-quality, copy-pasteable component library built on Radix UI
- **Benefits**: Full control over component code, easy customization, consistent design language

## AI Usage

- **TypeScript Interfaces**: Generated initial type definitions for SpaceX API responses based on API documentation
- **Component Structure**: Assisted in scaffolding component architecture and prop interfaces
- **Code Refactoring**: Helped optimize React hooks and identify potential performance improvements
- **Documentation**: Used AI to help structure and write comprehensive documentation, including this README

## 🎨 Design Decisions

#### **Sidebar Navigation**

- **Desktop**: Persistent sidebar with collapsible sections
- **Mobile**: Sheet-based sidebar that slides in from the left
- **Implementation**: Custom `useScreenSize` hook for responsive behavior

#### **Details View (Sheet Pattern)**

- **Why a Sheet instead of a Modal?**
  - Better for detailed content that requires scrolling
  - Less intrusive than full-screen modals
  - Familiar pattern from mobile apps (iOS/Android)
  - Allows users to reference the list while viewing details

#### **Search Implementation**

- **Debouncing**: 300ms delay to reduce API calls
- **Search Scope**: Searches both launch name and details fields
- **UX**: Real-time feedback with loading states
- **Reset Behavior**: Automatically resets to page 1 when search term changes

#### **Pagination Strategy**

- **Client-side pagination**: 20 launches per page for optimal performance
- **Server-side pagination**: Leverages SpaceX API's built-in pagination
- **UX**: Scroll-to-top on page change for better navigation flow
- **Visual Feedback**: Disabled states and loading indicators

#### **Dark Mode**

- **System preference detection**: Respects user's OS theme preference
- **Manual toggle**: Users can override system preference
- **Smooth transitions**: No flash of wrong theme on page load

#### **Custom Hooks for Data Fetching**

```typescript
// Encapsulates React Query logic
useLaunches({ page, limit, search })
useLaunch(id)
useLaunchpad(id)
```

- **Benefits**: Reusable, testable, and separates concerns
- **Caching**: React Query handles caching automatically

#### **Context for Global State**

- **ImageModalContext**: Manages image modal state globally
- **Why Context?**: Modal can be triggered from multiple components (launch details, list items)
- **Alternative considered**: Could use a state management library, but Context is sufficient for this use case

#### **Composition over Configuration**

- Components accept children and render props where appropriate
- Flexible, reusable component APIs

## 🛠️ Challenges & Trade-offs

### **API Challenges**

#### **Inconsistent Data**

- **Challenge**: Some launches have missing fields (details, images, launchpad info)
- **Solution**: Defensive programming with optional chaining and fallback values
- **UX**: Graceful degradation - show available data, hide missing sections

### **Performance Optimizations**

#### **Image Loading**

- **Challenge**: Large patch images could slow down the list
- **Solution**: Use small thumbnails in list, load large images on demand in modal
- **Future**: Implement lazy loading and image optimization

#### **Search Debouncing**

- **Challenge**: Typing triggers API calls on every keystroke
- **Solution**: 300ms debounce delay
- **Trade-off**: Slight delay in search results vs. reduced server load

#### **Pagination**

- **Challenge**: Loading all launches would be slow and memory-intensive
- **Solution**: Server-side pagination with 20 items per page
- **Trade-off**: Users must paginate to see all results, but better performance
- **Alternative considered**: Infinite scroll could provide a smoother browsing experience, but pagination offers better control and navigation for users who want to jump to specific pages

## 🔮 Future Improvements

If given more time, here's what I would improve or refactor:

### **Performance**

1. **Image Optimization**: Implement Next.js Image component with lazy loading
2. **Service Worker**: Add offline support and caching
3. **Code Splitting**: Lazy load components that aren't immediately visible

### **Features**

1. **URL State Management**: Use URL search params to persist page number and search terms, enabling bookmarkable states and browser back/forward navigation
2. **Advanced Filtering**: Filter by success status, date range, launchpad
3. **Sorting Options**: Sort by date, flight number, name
4. **Export**: Export launch data to CSV/JSON
5. **Real-time Updates**: WebSocket integration for live launch updates
6. **Route-based Launch Details**: Implement Next.js parallel and intercepted routes to make launch details a route itself (e.g., `/launches/[id]`), improving shareability via direct links while maintaining the sheet UI pattern through route interception

### **Developer Experience**

1. **Testing**: Add unit tests (Jest) and integration tests (React Testing Library)
2. **Error Boundaries**: Better error handling and user feedback
3. **Loading Skeletons**: More granular loading states
4. **Accessibility**: Enhanced ARIA labels and keyboard navigation

### **Code Quality**

1. **Refactor**: Extract magic numbers to constants
2. **Type Safety**: Stricter TypeScript configuration
3. **Code Splitting**: Route-based code splitting

### **UX Enhancements**

1. **Animations**: More micro-interactions and transitions
2. **Empty States**: Better empty state designs
3. **Error Messages**: More helpful error messages

Built with ❤️.
