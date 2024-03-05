# Room Scheduling Project

[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/nick-souza/spring-boot-microservices/blob/master/README.pt-br.md)

This project was developed for the Distributed Systems and Usability and Web Development courses, at the Information Systems college. It is a CRUD system for scheduling, rooms, and users, with authentication and role-based authorization.

## Technologies Used

The project uses a combination of modern and efficient technologies to provide a superior user experience and a robust and scalable backend.

- **Frontend**: React and TypeScript, with Ant Design for the UI library, Axios, Moment, Next.js, and Nookies.

- **Backend**: Java, Spring Boot, separated into micro-services, as per the rules of the Distributed Systems course. The system has authentication with JWT tokens and BCrypt password encryption.

## Micro-services

The system is divided into several micro-services, each with a specific function, allowing a clear separation of responsibilities and facilitating system maintenance and scalability. As per the assignment instructions.

- **Gateway Server**: Uses `spring-cloud-starter-gateway`. This server is responsible for managing different routes and has an authentication filter on these routes, preventing unauthorized users' access.

- **Eureka Server**: Uses `spring-cloud-starter-netflix-eureka-server`. This server is responsible for providing a discovery service for micro-services, allowing them to communicate with each other efficiently.

- **Config Server**: Uses `spring-cloud-config-server`. This server manages configuration files in YAML format that contain database connection data. This allows centralized and easy-to-manage configuration for all micro-services.

- **Authentication Server**: This server is responsible for managing user authentication.

- **User Server**: This server is responsible for managing user data, connecting to a MYSQL database.

- **Room Server**: This server is responsible for managing room data, connecting to a PostgreSQL database.

- **Schedule Server**: This server is responsible for managing schedules, connecting to a PostgreSQL database.

## Databases

The project uses a combination of MySQL and PostgreSQL to manage data. Each server has its own database, allowing a clear separation of responsibilities and facilitating maintenance and scalability. As per the assignment instructions.

- **Schedule Server**: Uses MySQL, running in a Docker container.

- **User Server**: Uses PostgreSQL, running in a Docker container.

- **Room Server**: Uses another instance of PostgreSQL, running in a Docker container.

To manage these PostgreSQL databases, there is a pgAdmin container and for MYSQL, MYSQL Workbench was used.

## Docker and Docker Compose

All services and databases are encapsulated in Docker containers, allowing easy and consistent deployment and configuration in any environment. Docker Compose is used to manage all these containers, allowing the entire system to be started with a single command.
