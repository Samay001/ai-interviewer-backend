<img width="1854" height="946" alt="image" src="https://github.com/user-attachments/assets/058bf23f-f89f-43b6-bb67-e8941eb00f17" />
<img width="1854" height="946" alt="image" src="https://github.com/user-attachments/assets/3baf1da7-5e68-4548-9215-b39100c7597c" />
<img width="1854" height="946" alt="image" src="https://github.com/user-attachments/assets/8806266c-7379-4595-8779-2afc93e07d3f" />
<img width="1854" height="946" alt="image" src="https://github.com/user-attachments/assets/f11cb70d-58b5-469a-b7fc-2ac97efd14b1" />





# AI Interviewer Backend

A scalable backend service for AI-powered interview scheduling, scoring, chatbot interactions, resume parsing, and result notifications. Built with [NestJS](https://nestjs.com/) and TypeScript.

## Features

- **Authentication**: JWT-based authentication and role-based access control.
- **AI Questions**: Generate and manage interview questions using AI.
- **Chatbot**: Real-time chatbot for candidate interaction.
- **Interview Scheduling**: Schedule interviews and update score status.
- **Interview Scoring**: Manage and record interview scores.
- **Result Email**: Send interview results via email.
- **Resume Parsing**: Parse resumes and generate relevant questions.
- **Speech**: Speech-related endpoints for interviews.
- **User Management**: CRUD operations for users.

## Project Structure

```
src/
  ai-questions/         # AI question generation
  auth/                 # Authentication & authorization
  chatbot/              # Chatbot logic & config
  common/               # Shared middleware
  interview-schedule/   # Interview scheduling
  interview-score/      # Interview scoring
  result-email/         # Email notifications
  resume-parsing/       # Resume parsing & question generation
  speech/               # Speech endpoints
  users/                # User management
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the project

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run start:prod
```

### Run tests

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Endpoints

- `/auth` - Authentication (login, register)
- `/ai-questions` - AI-generated questions
- `/chatbot` - Chatbot interactions
- `/interview-schedule` - Schedule interviews
- `/interview-score` - Interview scoring
- `/result-email` - Send result emails
- `/resume-parsing` - Resume parsing and question generation
- `/speech` - Speech endpoints
- `/users` - User management

## .env Structure
Create a `.env` file in the root directory with the following format:

- PORT=8080
- OPENAI_API_KEY= 'your OpenAI API key'
- MONGODB_URI="your-mongo-DB-URI"
- JWT_SECRET="Your JWT Secret Key"
  
