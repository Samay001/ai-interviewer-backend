# Interview Schedule Module

This module handles interview scheduling functionality for the AI Interviewer application.

## Features

- Create new interview schedules
- Retrieve interview schedules by various criteria
- Update interview status
- Mark interviews as completed
- Delete interview schedules

## API Endpoints

### POST `/interview-schedule`
Create a new interview schedule.

**Request Body:**
```json
{
  "adminFullName": "John Doe",
  "adminEmail": "john.doe@example.com",
  "applicantFullName": "Jane Smith",
  "applicantEmail": "jane.smith@example.com",
  "date": "2024-01-15",
  "time": "14:30",
  "domain": "Software Engineering",
  "specificQuestions": [
    "What is your experience with Node.js?",
    "How do you handle async operations?"
  ]
}
```

**Note:** `specificQuestions` is optional.

### GET `/interview-schedule`
Get all interview schedules.

### GET `/interview-schedule/:id`
Get a specific interview schedule by ID.

### GET `/interview-schedule/admin/:email`
Get all interview schedules for a specific admin.

### GET `/interview-schedule/applicant/:email`
Get all interview schedules for a specific applicant.

### POST `/interview-schedule/:id/status?status=newStatus`
Update the status of an interview schedule.

### POST `/interview-schedule/:id/complete`
Mark an interview as completed.

### DELETE `/interview-schedule/:id`
Delete an interview schedule.

## Database Schema

The interview schedule is stored in a separate MongoDB collection with the following fields:

- `adminFullName` (required): Full name of the admin
- `adminEmail` (required): Email of the admin
- `applicantFullName` (required): Full name of the applicant
- `applicantEmail` (required): Email of the applicant
- `date` (required): Interview date
- `time` (required): Interview time
- `domain` (required): Interview domain/topic
- `specificQuestions` (optional): Array of specific questions
- `status` (default: 'scheduled'): Current status of the interview
- `isCompleted` (default: false): Whether the interview is completed
- `createdAt` (auto-generated): Creation timestamp
- `updatedAt` (auto-generated): Last update timestamp

## Usage

The module is automatically imported into the main application. You can access the API endpoints at:

- Base URL: `http://localhost:5000/interview-schedule`
- Swagger Documentation: `http://localhost:5000/api` 