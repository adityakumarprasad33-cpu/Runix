# RUNIX Website — Complete Redesign Plan

## Overview

Transform the current dark-only, sci-fi themed RUNIX site into a **professional, premium OS company website** with light/dark mode, authentication, community hub, and early access beta flow.

---

## 1. Architecture Changes

### Theme System
- Add `ThemeProvider` context using a `useTheme` hook
- Support `light` (default) and `dark` modes
- Persist preference to `localStorage`
- Smooth CSS transition on toggle (`transition: background-color 0.3s, color 0.3s`)
- Tailwind v4 native dark mode: use `prefers-color-scheme` + class-based override

### Auth System
- Use existing Firebase Auth (already installed)
- Build `AuthProvider` context wrapping the app
- Store user state globally
- Create middleware (`middleware.ts`) to protect `/early-access`, `/beta-apply`, `/dashboard` routes

### Routing — New Page Structure

| Route | Status | Auth Required |
|---|---|---|
| `/` | Homepage | No |
| `/about` | About Runix | No |
| `/os` | Runix OS | No |
| `/roadmap` | Roadmap | No |
| `/community` | Community Hub | No (read), Yes (post) |
| `/news` | News / Updates | No |
| `/support` | Support / Contact | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/early-access` | Early Access v1.0 | **Yes** |
| `/beta-apply` | Beta Application | **Yes** |
| `/dashboard` | Profile / Dashboard | **Yes** |

### Middleware (`src/middleware.ts`)
- Check Firebase Auth session (via `onAuthStateChanged` equivalent or token cookie)
- Redirect unauthenticated users from protected routes to `/login`
- Redirect authenticated users away from `/login` and `/register`

---

## 2. Color System

### Theme Tokens (in `globals.css`)

```css
/* Light mode (default, no wrapper) */
:root, .light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-card: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --primary: #4f46e5;       /* indigo-600 */
  --primary-hover: #4338ca;
  --primary-light: #eef2ff;
  --accent: #06b6d4;         /* cyan-500 */
  --accent-light: #ecfeff;
  --success: #10b981;
  --error: #ef4444;
  --ring: rgba(79, 70, 229, 0.15);
}

/* Dark mode */
.dark {
  --bg-primary: #0b0b0f;
  --bg-secondary: #111118;
  --bg-card: #16161e;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: #1e293b;
  --primary: #818cf8;       /* indigo-400 */
  --primary-hover: #a5b4fc;
  --primary-light: rgba(129, 140, 248, 0.1);
  --accent: #22d3ee;         /* cyan-400 */
  --accent-light: rgba(34, 211, 238, 0.1);
  --success: #34d399;
  --error: #f87171;
  --ring: rgba(129, 140, 248, 0.15);
}
```

### Utility Classes
- `.btn-primary` — filled primary button
- `.btn-outline` — outlined button
- `.btn-ghost` — ghost button
- `.card` — rounded card with shadow/border
- `.input` — form input
- `.section` — page section with consistent spacing

---

## 3. Component Architecture

### Shared UI Components (`src/components/ui/`)

| Component | Description |
|---|---|
| `Button.tsx` | Primary/outline/ghost variants, sizes, loading state |
| `Card.tsx` | Base card with shadow, border, hover |
| `Input.tsx` | Form input with label, error state |
| `Textarea.tsx` | Form textarea |
| `Select.tsx` | Form select |
| `Badge.tsx` | Status/category badge |
| `Avatar.tsx` | User avatar with fallback |
| `ThemeToggle.tsx` | Sun/Moon toggle button |
| `LoadingSpinner.tsx` | Centered loading state |
| `SectionReveal.tsx` | Scroll-triggered fade-in wrapper |

### Layout Components (`src/components/layout/`)

| Component | Description |
|---|---|
| `Header.tsx` | Responsive nav with theme toggle + auth state |
| `Footer.tsx` | Full footer |
| `MobileNav.tsx` | Mobile drawer menu |

### Page-specific Components (`src/components/`)

| Component | For Page |
|---|---|
| `HeroAnimation.tsx` | OS boot-up / floating panels animation |
| `OsFeatureCard.tsx` | Runix OS features grid |
| `RoadmapTimeline.tsx` | Interactive roadmap |
| `CommunityFeed.tsx` | Community posts feed |
| `CommunitySidebar.tsx` | Categories, trending, stats |
| `PostCard.tsx` | Individual community post |
| `EarlyAccessForm.tsx` | Multi-step application form |
| `BetaOverview.tsx` | Beta program info card |
| `DashboardSidebar.tsx` | User profile sidebar |

---

## 4. Page-by-Page Design

### 4.1 Homepage (`/`)
- **Hero**: Large headline "The Operating System for the Next Era" + OS animation (floating terminal panels, boot sequence text, or UI mockup with system stats)
- **Two CTAs**: "Join Community" (→ /community), "Apply for Early Access" (→ /early-access)
- **What is Runix?**: 3-column card grid explaining the OS
- **Why Runix is Different**: Comparison-style section with feature highlights
- **Roadmap Preview**: 3-4 timeline milestones, "View Full Roadmap" link
- **Community Preview**: Recent activity, member count, "Join the Discussion" CTA
- **Early Access Banner**: Countdown or "v1.0 Coming" strip with apply button
- **Footer**: Links, social, copyright

### 4.2 About Runix (`/about`)
- Mission statement, team story, values, open-source commitment
- Timeline of key milestones
- Tech stack / architecture overview

### 4.3 Runix OS (`/os`)
- Product page for the OS itself
- Feature sections: Kernel, UI/UX, Security, Performance, Compatibility
- Screenshots/mockups
- System requirements
- Download / early access CTA

### 4.4 Roadmap (`/roadmap`)
- Interactive timeline: Alpha → Beta → v1.0 → v2.0
- Each phase with status, description, date
- Progress indicators per milestone
- Subscribe for updates option

### 4.5 Community (`/community`)
- **Header**: Community stats (members, posts, online)
- **Tabs/Sections**: All Posts, UI, Kernel, Drivers, Testing, Feedback, Features
- **Feed**: Cards with title, preview, category badge, author, likes, comments, date
- **Sidebar**: Trending topics, active members, announcements
- **Post/Reply**: Requires login → shows modal or redirect
- **New Post Button**: Opens create post form (logged in only)

### 4.6 News / Updates (`/news`)
- Blog-style article listing
- Categories: Release Notes, Dev Diaries, Community Spotlight
- Individual article pages

### 4.7 Support / Contact (`/support`)
- FAQ accordion sections
- Contact form (name, email, subject, message)
- Links to community, docs, GitHub

### 4.8 Login (`/login`)
- Clean centered card
- Email + password fields
- "Don't have an account? Register" link
- Error/success states

### 4.9 Register (`/register`)
- Clean centered card
- Name, email, password, confirm password
- "Already have an account? Login" link

### 4.10 Early Access (`/early-access`) — Protected
- **Header**: "Runix v1.0 Early Access" + version badge
- **Hero Card**: Product intro, "Be among the first" messaging
- **What You Get**: Feature cards (early builds, private community, direct feedback, recognition)
- **Application Form** (multi-step):
  - Step 1: Personal info (name, email)
  - Step 2: Experience (years, interests, device details)
  - Step 3: Motivation (reason for joining, what you'll build)
  - Step 4: Review & Submit
- **Progress indicator** (steps 1-4)
- **Success/Error states** with clear feedback

### 4.11 Beta Application (`/beta-apply`) — Protected
- Similar to Early Access but focused on technical beta testing
- Technical survey (hardware, OS experience, testing availability)

### 4.12 Dashboard (`/dashboard`) — Protected
- User profile info (name, email, avatar)
- Application status (Pending / Approved / Rejected)
- Badges / rewards
- Community activity (recent posts, comments)
- Settings (theme, notifications)

---

## 5. Data Models (Firestore)

### Users (via Firebase Auth, extended in Firestore)
```ts
/users/{uid}: {
  displayName: string
  email: string
  avatar?: string
  joinedAt: timestamp
  role: 'user' | 'moderator' | 'admin'
  earlyAccessStatus: 'none' | 'applied' | 'approved' | 'rejected'
}
```

### Community Posts
```ts
/posts/{postId}: {
  title: string
  content: string
  category: 'ui' | 'kernel' | 'drivers' | 'testing' | 'feedback' | 'features' | 'general'
  authorId: string
  authorName: string
  likes: number
  commentCount: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Comments
```ts
/comments/{commentId}: {
  postId: string
  content: string
  authorId: string
  authorName: string
  likes: number
  createdAt: timestamp
}
```

### Early Access Applications
```ts
/applications/{appId}: {
  userId: string
  name: string
  email: string
  reason: string
  deviceDetails: string
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  interestArea: string
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
  submittedAt: timestamp
}
```

---

## 6. Implementation Phases

### Phase 1 — Foundation (estimated: 2-3 hours)
1. Set up theme system (`ThemeProvider`, `useTheme`, globals.css variables)
2. Update `globals.css` with light/dark tokens, utility classes, base styles
3. Build shared UI components (Button, Card, Input, etc.)
4. Rebuild `layout.tsx` with `ThemeProvider`, `AuthProvider`
5. Build `Header.tsx` with responsive nav + theme toggle + auth state
6. Build `Footer.tsx`
7. Add page transitions with Framer Motion

### Phase 2 — Public Pages (estimated: 3-4 hours)
1. Homepage with hero animation, sections, CTAs
2. About page
3. Runix OS product page
4. Roadmap timeline
5. News / Updates listing
6. Support / Contact

### Phase 3 — Auth System (estimated: 1-2 hours)
1. Build Login page
2. Build Register page
3. Create `AuthProvider` context
4. Create `middleware.ts` route protection
5. Wire up Firebase Auth

### Phase 4 — Community (estimated: 3-4 hours)
1. Community feed with categories
2. Post creation form
3. Comments system
4. Sidebar (trending, members, stats)
5. API routes for posts/comments (Firestore-backed)

### Phase 5 — Protected Pages (estimated: 2-3 hours)
1. Early Access page with multi-step form
2. Beta Application page
3. User Dashboard / Profile
4. API routes for applications

### Phase 6 — Polish (estimated: 1-2 hours)
1. Loading states
2. Error boundaries
3. Responsive testing
4. Animation polish
5. Performance check

---

## 7. File Changes Summary

### New Files (~40)
```
src/
├── middleware.ts
├── contexts/
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── hooks/
│   ├── useTheme.ts
│   └── useAuth.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── SectionReveal.tsx
│   ├── HeroAnimation.tsx
│   ├── OsFeatureCard.tsx
│   ├── RoadmapTimeline.tsx
│   ├── CommunityFeed.tsx
│   ├── CommunitySidebar.tsx
│   ├── PostCard.tsx
│   ├── EarlyAccessForm.tsx
│   ├── BetaOverview.tsx
│   └── DashboardSidebar.tsx
├── app/
│   ├── os/page.tsx
│   ├── roadmap/page.tsx
│   ├── community/page.tsx
│   ├── news/page.tsx
│   ├── news/[id]/page.tsx
│   ├── support/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── early-access/page.tsx
│   ├── beta-apply/page.tsx
│   ├── dashboard/page.tsx
│   └── api/
│       ├── posts/route.ts
│       ├── posts/[id]/route.ts
│       ├── comments/route.ts
│       ├── applications/route.ts
│       └── users/route.ts
```

### Modified Files (~5)
```
├── src/app/globals.css
├── src/app/layout.tsx
├── src/app/page.tsx
├── src/app/about/page.tsx
├── src/app/contact/page.tsx (→ becomes /support)
```

### Removed (~10 obsolete old pages)
```
src/app/ecosystem/
src/app/technology/
src/app/products/
src/app/research/
src/app/careers/
src/app/portal/
src/app/status/
src/app/privacy/
src/app/terms/
src/app/secure-node-access/
```
