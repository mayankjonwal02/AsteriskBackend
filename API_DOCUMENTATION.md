# Express.js Backend API Documentation

## Overview
This backend provides an admin-authenticated system for managing employees, MM collections, deposits, and generating financial reports. All endpoints (except login) require a valid JWT Bearer token in the `Authorization` header.

---
base url : https://asterisk-backend-psi.vercel.app
## 1. Auth System

### POST `/auth/login`
- **Description:** Admin login. Returns a JWT token if credentials are valid.
- **Request Body:**
```
{
  "username": "Admin",
  "password": "Password"
}
```
- **Response Body:**
```
{
  "token": "<JWT_TOKEN>"
}
```

### GET `/auth/verify`
- **Description:** Verifies the provided JWT token.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Body:**
```
{
  "valid": true,
  "user": { "username": "Admin", "role": "admin", ... }
}
```

---

## 2. Employee Management

### GET `/employees`
- **Description:** List all employees.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Body:**
```
[
  { "_id": "...", "name": "Mayank", "employeeId": "EMP001" },
  ...
]
```

### GET `/employees/:id`
- **Description:** Fetch individual employee by MongoDB `_id`.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Body:**
```
{ "_id": "...", "name": "Mayank", "employeeId": "EMP001" }
```

### POST `/employees`
- **Description:** Add a new employee (optional, for extensibility).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```
{
  "name": "New Employee",
  "employeeId": "EMP006"
}
```
- **Response Body:**
```
{ "_id": "...", "name": "New Employee", "employeeId": "EMP006" }
```

---

## 3. MM Collection & Deposit System

### POST `/collections`
- **Description:** Add MM collection for an employee.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```
{
  "employeeId": "<MongoDB Employee _id>",
  "date": "YYYY-MM-DD",
  "amount": 10000
}
```
- **Response Body:**
```
{ "_id": "...", "employeeId": "...", "date": "...", "amount": 10000 }
```

### POST `/collections/bulk`
- **Description:** Bulk insert MM collections for multiple employees. Prevents duplicates and validates input.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```
{
  "collections": [
    { "employeeId": "...", "date": "YYYY-MM-DD", "amount": 10000 },
    ...
  ]
}
```
- **Response Body:**
```
[
  { "_id": "...", "employeeId": "...", "date": "...", "amount": 10000 },
  ...
]
```

### GET `/collections?employeeId=<id>`
- **Description:** Get collections for an employee (all if no query param).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Body:**
```
[
  { "_id": "...", "employeeId": "...", "date": "...", "amount": 10000 },
  ...
]
```

### POST `/deposits`
- **Description:** Add deposit for an employee.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```
{
  "employeeId": "<MongoDB Employee _id>",
  "date": "YYYY-MM-DD",
  "amount": 5000
}
```
- **Response Body:**
```
{ "_id": "...", "employeeId": "...", "date": "...", "amount": 5000 }
```

### POST `/deposits/bulk`
- **Description:** Bulk insert deposits for multiple employees. Prevents duplicates and validates input.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```
{
  "deposits": [
    { "employeeId": "...", "date": "YYYY-MM-DD", "amount": 5000 },
    ...
  ]
}
```
- **Response Body:**
```
[
  { "_id": "...", "employeeId": "...", "date": "...", "amount": 5000 },
  ...
]
```

### GET `/deposits?employeeId=<id>`
- **Description:** Get deposits for an employee (all if no query param).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Body:**
```
[
  { "_id": "...", "employeeId": "...", "date": "...", "amount": 5000 },
  ...
]
```

---

## 4. Outstanding Report

### GET `/reports/outstanding`
- **Description:** Returns summary for each employee: total collection, total deposit, outstanding, and most recent transaction date.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Body:**
```
[
  {
    "employee": { "_id": "...", "name": "...", "employeeId": "..." },
    "totalCollection": 10000,
    "totalDeposit": 5000,
    "outstanding": 5000,
    "mostRecentDate": "2025-03-28T00:00:00.000Z"
  },
  ...
]
```

---

## 5. Employee Payment Report

### GET `/reports/payments/:employeeId`
- **Description:** Returns all MM collections and deposits for an employee in chronological order, with rolling outstanding balance (deposits clear oldest dues first).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Body:**
```
[
  { "type": "collection", "date": "2025-03-26T00:00:00.000Z", "amount": 10000, "runningOutstanding": 10000 },
  { "type": "deposit", "date": "2025-03-28T00:00:00.000Z", "amount": 5000, "runningOutstanding": 5000 },
  ...
]
```

---

## Error Responses
- All endpoints may return standard error responses:
```
{ "message": "Error description" }
```
- Bulk endpoints may also return:
```
{ "message": "Duplicate entry for employeeId ... on date ..." }
```

---

## Notes
- All dates are in ISO 8601 format (e.g., `2025-03-28T00:00:00.000Z`).
- All endpoints except `/auth/login` and `/auth/verify` require a valid JWT Bearer token.
- Use MongoDB `_id` for employee references in collections and deposits.
- Bulk endpoints validate input and prevent duplicate (employeeId + date) entries.
