# Employee Vacations Management System

Employee Vacations Management System is a web application designed to simplify and streamline the process of managing employee vacations within a company. 
This system allows administrators or managers to oversee and approve vacation requests submitted by employees.

# Features 
- User Roles: The system supports different user roles, including admin (manager) and regular users (employees). Admins have the authority to approve or reject vacation requests, while users can submit vacation requests. 
- Vacation Requests: Users can submit vacation requests through an intuitive interface. They can specify the start date, end date, and additional comments related to their vacation. 
- Approval Workflow: Admins can view pending vacation requests and take action to approve or reject them. The system provides a streamlined workflow for managing these requests. 
- Calendar View: The system offers a calendar view to visualize approved vacations, making it easier to manage scheduling and avoid conflicts. 
- Data Visualization: Charts and graphs are used to visualize vacation data, providing insights into employee vacations over time. 
- Sorting and Filtering: Admins can sort and filter vacation data based on various criteria such as employee name, vacation duration, and approval status.

# Technologies Used 

- Frontend: React, Redux, React Calendar, Chart.js 
- Backend: Node.js, Express.js, MongoDB

# Installation 

1. Clone the repository: git clone https://github.com/Kastriot78/employee-vacations-management-system.git 
2. Install dependencies: Frontend: cd client && npm install Backend: cd server && npm install 
3. Configure environment variables: Create a .env file in the server directory and add necessary environment variables (CORS_DOMAINS,JWT_SECRET,DB_CONNECTION_URL_LOCAL). 
4. Start the development servers: Frontend: cd client && npm start Backend: cd server && npm start 
5. Open your browser and navigate to http://localhost:3000 to access the application.

# Usage

- Admin Dashboard: When you login as an admin, you will have access to the admin dashboard where you can view pending vacation requests, approve or reject requests, view vacation statistics, etc. 
- User Dashboard: Users can log in and submit vacation requests, view their vacation history, and view vacations of all employees on the full calendar option.

![alt text](https://github.com/Kastriot78/Kastriot78-EmployeeVacationsSystem/blob/main/images-app/Screenshot_2.jpg?raw=true)
![alt text](https://github.com/Kastriot78/Kastriot78-EmployeeVacationsSystem/blob/main/images-app/Screenshot_3.jpg?raw=true)
![alt text](https://github.com/Kastriot78/Kastriot78-EmployeeVacationsSystem/blob/main/images-app/Screenshot_4.jpg?raw=true)
