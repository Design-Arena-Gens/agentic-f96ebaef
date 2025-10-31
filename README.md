# MeeshoLens - Real-Time Product Analyzer

A real-time, mobile-first web tool that analyzes Meesho product links and returns live product data, reviews, price trends, and AI-powered behavioral insights.

## Features

- Real-Time Analysis: Fetches live data from Meesho products (currently using mock data)
- AI-Powered Insights: Sentiment analysis, buying patterns, and sales behavior predictions
- Price Tracking: Historical price trends with 1M, 6M, and Lifetime views
- Review Analysis: Comprehensive review sentiment breakdown
- Mobile-First Design: Optimized for mobile devices
- Dark Mode: Beautiful dark theme with teal-cyan gradients

## Tech Stack

- Next.js 15 (App Router) with TypeScript
- TailwindCSS + Framer Motion
- React Query (TanStack)
- Recharts for charts

## Installation

```bash
npm install
npm run dev
```

## API Endpoints

- POST /api/analyze - Start analysis
- GET /api/status/:jobId - Check progress
- GET /api/results/:jobId?range=1m|6m|life - Get results

## Deployment

```bash
vercel --prod
```
