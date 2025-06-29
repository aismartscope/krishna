# Restaurant Management System - replit.md

## Overview

This is a full-stack restaurant management system built with a modern web architecture. The application provides comprehensive functionality for restaurant operations including POS billing, inventory management, expense tracking, staff management, QR menu system, and AI-powered assistance. The system supports bilingual operations (English and Tamil) and is designed for both desktop and mobile use.

## System Architecture

The application follows a clean separation between client and server components:

- **Frontend**: React-based SPA with TypeScript, built using Vite
- **Backend**: Express.js REST API server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with OpenID Connect
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state, React Context for local state
- **Internationalization**: Custom translation system supporting English and Tamil

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: Passport.js with OpenID Connect strategy for Replit Auth
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with consistent error handling

### Database Schema
- **Users**: Authentication and profile information
- **Menu Management**: Categories and items with multilingual support
- **Inventory**: Stock tracking with minimum level alerts
- **Orders**: POS transactions with line items
- **Expenses**: Financial tracking by categories
- **Staff**: Employee management with attendance tracking
- **QR Tables**: Table management for QR code system
- **Sessions**: Session storage for authentication

## Data Flow

1. **Authentication Flow**: Users authenticate via Replit Auth, sessions stored in PostgreSQL
2. **API Requests**: Frontend makes authenticated requests to Express API endpoints
3. **Database Operations**: Drizzle ORM handles type-safe database queries
4. **Real-time Updates**: TanStack Query manages cache invalidation and refetching
5. **Bilingual Support**: Translation system provides English/Tamil text based on user preference

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router
- **passport**: Authentication middleware
- **openid-client**: OpenID Connect client implementation

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and enhanced developer experience
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

The application is designed for deployment on Replit with the following configuration:

### Build Process
- **Development**: `npm run dev` - Runs both Vite dev server and Express API
- **Production Build**: `npm run build` - Builds React app and bundles Express server
- **Production Start**: `npm start` - Serves the built application

### Environment Requirements
- **DATABASE_URL**: PostgreSQL connection string (auto-provisioned on Replit)
- **SESSION_SECRET**: Secret for session encryption
- **REPL_ID**: Replit environment identifier
- **ISSUER_URL**: OpenID Connect issuer URL for authentication

### Database Management
- **Migrations**: Drizzle Kit handles schema migrations
- **Push Command**: `npm run db:push` applies schema changes to database

## Changelog

```
Changelog:
- June 29, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```