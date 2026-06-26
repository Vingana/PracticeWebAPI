\# Store Web Application



Online store.



\## Project Setup



\### 1. Clone the repository



```bash

git clone https://github.com/Vingana/PracticeWebAPI.git

cd PracticeWebAPI

```



2\. Backend Setup



The backend consists of:



Store.Web

Store.Services

Store.Infrastructure

Store.Domain



Go to the backend folder:



cd Store.Web



Restore NuGet packages:



dotnet restore



Apply database migrations:



dotnet ef database update



Run the backend application:



dotnet run



Backend will be available at:



https://localhost:7226

3\. Frontend Setup



Open a new terminal and go to the frontend folder:



cd StoreFrontend



Install dependencies:



npm install



Start the development server:



npm run dev



Frontend will be available at:



http://localhost:50129



\## Technologies



\- ASP.NET Core Web API

\- Entity Framework Core

\- SQLite

\- React

\- TypeScript

\- Vite

