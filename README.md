# Store Web Application



Online store.

## Prerequisites

Before you begin, ensure you have the following installed:
* .NET SDK 8.0+
* Node.js (latest LTS version)

## Project Setup


### 1. Clone the repository



```bash

git clone https://github.com/Vingana/PracticeWebAPI.git

cd PracticeWebAPI

```



### 2. Backend Setup



The backend consists of:



Store.Web

Store.Services

Store.Infrastructure

Store.Domain



Go to the backend folder:


```bash
cd Store.Web
```


Restore NuGet packages:


```bash
dotnet restore
```


Apply database migrations:


```bash
dotnet ef database update
```


Run the backend application:


```bash
dotnet run
```


Backend will be available at:


https://localhost:7226

### 3. Frontend Setup



Open a new terminal and go to the frontend folder:


```bash
cd StoreFrontend
```


Install dependencies:


```bash
npm install
```


Start the development server:


```bash
npm run dev
```


Frontend will be available at:



http://localhost:50129



# Technologies



- ASP.NET Core Web API

- Entity Framework Core

- SQLite

- React

- TypeScript

- Vite

