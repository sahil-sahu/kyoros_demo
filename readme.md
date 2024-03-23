# Kyoros: Health Monitoring System

Kyoros is a project that simulates ICU readings like blood pressure (BP) and heart rate (bpm) and shares them with the backend. In the client application, users (hospital staff) can monitor patient behavior in real-time and receive notifications on patients exhibiting abnormal behavior.

## Demo Video

https://github.com/sahil-sahu/kyoros_demo/assets/65727965/4e0b1f63-c27d-46e7-8fc0-fc9630aed314

## Technical Overview

### Tech Stack

#### Backend

- Node.js and Express
- TypeScript
- MongoDB
- Firebase Admin SDK
- Redis
- Socket.IO Server

#### Frontend

- Next.js 14
- Typescript
- Tanstack React Query
- shadcn/ui and Tailwind CSS
- React Charts
- Socket.IO Client

#### Dummy ICU Simulator:

- Python
- Socket.IO Client

## Running the Project

Don't worry, we've got Docker!

**Step 0:** Install Docker and clone the project.

**Step 1**: Get .env files from the contributor

**Step 2:**
In the root of the project, run the following command:

```bash
docker-compose build
```

**Step 3:**
Then, start the containers by running:

```bash
docker-compose up
```

**Step 4:**
Visit the site at http://localhost:3000 .
