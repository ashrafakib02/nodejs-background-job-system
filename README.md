# Node.js Background Job System

A production-style backend system for handling asynchronous jobs using **Node.js**, **BullMQ**, **Redis**, **PostgreSQL**, and **Prisma**.

It demonstrates how to build a queue-based architecture with **job creation APIs, worker processing, retries, delayed jobs, priority handling, failure tracking, testing, and CI**.

---

## Features

- Background job creation through REST API
- Redis-backed queue using BullMQ
- Worker-based async job processing
- Retry mechanism with exponential backoff
- Delayed job execution
- Priority-based job processing
- Failure reason tracking in database
- Job listing with filtering and pagination
- Swagger API documentation
- Jest + Supertest testing
- GitHub Actions CI pipeline

---

## Tech Stack

- Node.js
- Express
- BullMQ
- Redis
- PostgreSQL
- Prisma ORM
- Jest
- Supertest
- Swagger

---

## Architecture

Client → API → BullMQ Queue → Worker → PostgreSQL  
                ↓  
               Redis

---

## Why This Project Matters

This project goes beyond basic CRUD and demonstrates practical backend engineering concepts such as:

- asynchronous processing
- queue-based system design
- retries and backoff strategies
- delayed and priority jobs
- worker-based processing
- observability through job status APIs

---

## API Documentation

Swagger UI available at:

http://localhost:5001/api-docs

---

## Endpoints

### Create Job
POST /api/jobs

### Get All Jobs
GET /api/jobs

### Get Job By ID
GET /api/jobs/:id


## Query Features

### Pagination
GET /api/jobs?page=1&limit=10

### Filter by Status
GET /api/jobs?status=failed


## Example Requests

### Create Job
{
  "type": "email",
  "payload": {
    "to": "test@example.com",
    "subject": "Hello",
    "body": "Test email"
  },
  "delay": 5000,
  "priority": 1
}

### Create Delayed Job
{
  "type": "email",
  "payload": {
    "to": "delay@example.com",
    "subject": "Delayed Job",
    "body": "This runs later"
  },
  "delay": 5000
}

### Create Priority Job
{
  "type": "email",
  "payload": {
    "to": "high@example.com",
    "subject": "High Priority",
    "body": "Urgent job"
  },
  "priority": 1
}


## Example Requests

### Get All Jobs
{
  "success": true,
  "message": "Jobs fetched successfully",
  "jobs": [
    {
      "id": 48,
      "type": "email",
      "payload": {
        "to": "test@example.com"
      },
      "status": "pending",
      "failedReason": null,
      "createdAt": "2026-03-29T06:15:44.468Z",
      "updatedAt": "2026-03-29T06:15:44.468Z"
    }
  ],
  "pagination": {
    "total": 48,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}

## Project Structure

src/
  config/
  controllers/
  queues/
  routes/
  services/
  validators/
  workers/
tests/

## Getting Started

### 1. Clone the repository

- git clone <your-repo-url>
- cd nodejs-background-job-system

### 1. Install dependencies

npm install

### 1. Configure environment variables

Create a .env file from .env.example

### 1. Run Prisma migration

- npx prisma migrate dev
- npx prisma generate

### 1. Start Redis

Make sure Redis is running locally on port 6379.

### 1. Start API server

npm run dev

### 1. Start worker

node src/workers/jobWorker.js

## Scripts

- npm run dev        # Start development server
- npm start          # Start production server
- npm test           # Run tests
- npm run lint       # Run ESLint
- npm run format     # Format code with Prettier

## Test Coverage

Includes API and service-level tests for:

- job creation
- invalid input
- job listing
- pagination
- filtering
- get job by ID
- not found cases

## Future Improvements
- queue dashboard
- dead-letter queue
- multiple worker types
- email/SMS provider integration
- deployment with Docker
