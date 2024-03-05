# Projeto de Agendamento de Salas

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/nick-souza/spring-boot-microservices/blob/master/README.md)

Este projeto foi desenvolvido para as disciplinas de Sistemas Distribuídos e Usabilidade e Desenvolvimento Web, na faculdade de Sistemas de Informação. É um sistema CRUD para agendamentos, salas e usuários, com autenticação e autorização baseada em funções.

## Tecnologias Utilizadas

O projeto utiliza uma combinação de tecnologias modernas e eficientes para fornecer uma experiência de usuário superior e um backend robusto e escalável.

- **Frontend**: React e TypeScript, com Ant Design para a biblioteca de UI, Axios, Moment, Next.js e Nookies.

- **Backend**: Java, Spring Boot, separado em micro-serviços, conforme as regras da disciplina de Sistemas Distribuídos. O sistema possui autenticação com JWT tokens e criptografia de senha BCrypt.

## Micro-serviços

O sistema é dividido em vários micro-serviços, cada um com uma função específica, permitindo uma separação clara de responsabilidades e facilitando a manutenção e a escalabilidade do sistema. Conforme as instruções do trabalho.

- **Gateway Server**: Utiliza o `spring-cloud-starter-gateway`. Este servidor é responsável por gerenciar diferentes rotas e possui um filtro de autenticação nessas rotas, impedindo o acesso de usuários não autorizados.

- **Eureka Server**: Utiliza o `spring-cloud-starter-netflix-eureka-server`. Este servidor é responsável por fornecer um serviço de descoberta para os micro-serviços, permitindo que eles se comuniquem entre si de maneira eficiente.

- **Config Server**: Utiliza o `spring-cloud-config-server`. Este servidor gerencia arquivos de configuração em formato YAML que contêm dados de conexão com os bancos de dados. Isso permite uma configuração centralizada e fácil de gerenciar para todos os micro-serviços.

- **Authentication Server**: Este servidor é responsável por gerenciar a autenticação dos usuários.

- **User Server**: Este servidor é responsável por gerenciar os dados dos usuários, se conectando com uma base de dados MYSQL.

- **Room Server**: Este servidor é responsável por gerenciar os dados das salas, se conectando com uma base de dados PostgresSQL.

- **Schedule Server**: Este servidor é responsável por gerenciar os agendamentos, se conectando com uma base de dados PostgresSQL.

## Bancos de Dados

O projeto utiliza uma combinação de MySQL e PostgreSQL para gerenciar os dados. Cada servidor tem seu próprio banco de dados, permitindo uma separação clara de responsabilidades e facilitando a manutenção e a escalabilidade. Conforme as instruções do trabalho.

- **Schedule Server**: Utiliza MySQL, rodando em um container Docker.

- **User Server**: Utiliza PostgreSQL, rodando em um container Docker.

- **Room Server**: Utiliza outra instância de PostgreSQL, rodando em um container Docker.

Para gerenciar esses bancos de dados PostgreSQL, há um container do pgAdmin e para o MYSQL foi usado o MYSQL Workbench.

## Docker e Docker Compose

Todos os serviços e bancos de dados são encapsulados em containers Docker, permitindo uma implantação e configuração fáceis e consistentes em qualquer ambiente. O Docker Compose é usado para gerenciar todos esses containers, permitindo que todo o sistema seja iniciado com um único comando.

##

![](https://imgur.com/x0nWTqZ.png)

##

![](https://imgur.com/pRr03Ht.png)

##

![](https://imgur.com/I7uDlHb.png)

##

![](https://imgur.com/8m4dhfP.png)

##

![](https://imgur.com/7UFseJ4.png)

##

![](https://imgur.com/oItVprl.png)

##

![](https://imgur.com/0GaY6qZ.png)

##

![](https://imgur.com/Z0nMa8u.png)

##

![](https://imgur.com/Jwnh7OT.png)

##

![](https://imgur.com/SfwhCRa.png)
