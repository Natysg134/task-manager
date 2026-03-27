# Task Manager

A full-stack task management app built with .NET 8 and React.

---

## Tech Stack

**Backend**
- .NET 8 / ASP.NET Core
- Entity Framework Core
- SQL Server

**Frontend**
- React (CRA)
- React Bootstrap
- Axios

---

## Project Structure

```
task-manager/
├── backend/
│   ├── TaskManager.sln
│   └── src/
│       ├── Domain/          → Entities and repository interfaces
│       ├── Application/     → Services, DTOs and service interfaces
│       ├── Infrastructure/  → EF Core, SQL Server, repositories
│       └── Presentation/    → Controllers, middleware, program entry
├── frontend/
│   └── task-manager-ui/
└── README.md
```

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org) (v18 or higher)
- A running SQL Server instance
- [VS Code](https://code.visualstudio.com) with the [mssql extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql)

---

## Database Setup

The project uses SQL Server. You can use any running SQL Server instance.

To connect via the VS Code mssql extension:

1. Open the mssql extension in VS Code
2. Click Add Connection
3. Enter your server credentials
4. Once connected you can inspect the database and run queries directly

The database and tables are created automatically when the backend starts via EF Core migrations — no manual setup needed.

### Update the connection string

Open backend/src/Presentation/appsettings.json and set your SQL Server credentials:
```
{
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database=TaskManagerDB;User Id=sa;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
}
}
```
---

## Running the Backend

### 1. Clone the repository
```
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```
### 2. Create the migration

Only needed the first time:
```
cd backend/src/Presentation
dotnet ef migrations add InitialCreate --project ../Infrastructure --startup-project .
```
### 3. Run the API

dotnet run

On startup the app will automatically:
- Create the TaskManagerDB database if it does not exist
- Run any pending migrations
- Insert seed data

API runs at http://localhost:5000
Swagger UI available at http://localhost:5000/swagger

---

## Running the Frontend
```
cd frontend/task-manager-ui
npm install
npm start
```
App runs at http://localhost:3000

---

## API Endpoints

| Method | Endpoint          | Description                                     |
|--------|-------------------|-------------------------------------------------|
| GET    | /api/tasks        | Get all tasks                                   |
| POST   | /api/tasks        | Create a task                                   |
| PUT    | /api/tasks/:id    | Update a task (title, description, isCompleted) |
| DELETE | /api/tasks/:id    | Soft delete a task                              |

### Request bodies

POST /api/tasks
{
"title": "My new task",
"description": "Optional description"
}

PUT /api/tasks/:id
{
"title": "Updated title",
"description": "Updated description",
"isCompleted": true
}

---

## Architecture

The backend follows Clean Architecture with four layers:

Presentation → Application → Domain
Infrastructure → Domain

| Layer          | Responsibility                                                                |
|----------------|-------------------------------------------------------------------------------|
| Domain         | Entities and repository interfaces. No external dependencies                  |
| Application    | Business logic, services and DTOs. Depends only on Domain                    |
| Infrastructure | EF Core implementation, SQL Server, repositories. Depends only on Domain     |
| Presentation   | HTTP controllers and middleware. Wires everything together                    |

Each layer only knows about the layers it directly depends on. The outer layers depend on the inner ones, never the other way around.

## App Preview

Here's a preview on how the task manager looks.
<img width="1395" height="567" alt="Screenshot 2026-03-27 at 5 09 26 PM" src="https://github.com/user-attachments/assets/dcf6c5a8-7680-4f5b-a589-91e9d617966d" />

To add a Task press the Add Task button at the top and a modal will displayed with the form to add task
<img width="524" height="466" alt="Screenshot 2026-03-27 at 5 11 02 PM" src="https://github.com/user-attachments/assets/6f80a7d7-25a5-4645-9b48-9fc7da247095" />

You can filter the tasks by status.
<img width="1339" height="316" alt="Screenshot 2026-03-27 at 5 11 16 PM" src="https://github.com/user-attachments/assets/d45622a3-b617-43b9-b0a6-5c2719ba1650" />

When all tasks are completed the badge at the top will turn green 
<img width="330" height="89" alt="Screenshot 2026-03-27 at 5 11 27 PM" src="https://github.com/user-attachments/assets/832af571-ed22-4641-9057-8b46d1353093" />

---

### Key decisions

- Soft delete — records are never removed from the database. An IsDeleted flag and a global EF Core query filter handle this transparently across all queries
- Single update endpoint — toggle and edit are both handled by PUT /api/tasks/:id since they are both updates to the same resource
- Exception handling middleware — errors are caught in one place so controllers stay clean
- Seed data — four initial tasks are inserted on first run via EF Core HasData

---

## Notes

- No authentication was added, it is out of scope
- The frontend runs on port 3000 and the backend on port 5000, CORS is configured accordingly
- ConfigureAwait(false) was intentionally left out — ASP.NET Core has no synchronization context so it adds no value here

