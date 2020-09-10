![public/index.html](readme_images/index.gif)

Table of contents:

- [The Agile Monkeys API Test](#the-agile-monkeys-api-test)
	* [Disclaimer](#disclaimer)
	* [Project introduction](#project-introduction)
		+ [Mandatory implementation requirements](#mandatory-implementation-requirements)
		+ [Optional implementation requirements](#optional-implementation-requirements)
		+ [Proposed solution](#proposed-solution)
	* [Quick start guide](#quick-start-guide)
	* [Project installation](#project-installation)
		+ [Local](#local)
		+ [Docker](#docker)
	* [Run the project](#run-the-project)
		+ [Run locally](#run-locally)
		+ [Run on Docker](#run-on-docker)
	* [GitHub OAuth login](#github-oauth-login)
	* [REST API documentation](#rest-api-documentation)
		+ [Pre-configured users](#pre-configured-users)
		+ [Feathers CRUD](#feathers-crud)
		+ [Swagger UI docs](#swagger-ui-docs)
		+ [Run with Postman](#run-with-postman)
	* [ToDo List](#todo-list)
	* [Bibliography](#bibliography)
		+ [Feathers](#feathers)
		+ [Sequelize](#sequelize)
		+ [Swagger](#swagger)
		+ [Docker](#docker)

----------

# The Agile Monkeys Api Test

A REST API to manage customer data for a small shop.

## Disclaimer

This is a demo project to provide an example of my skills for building a [REST compliant API](https://en.wikipedia.org/wiki/Representational_state_transfer). This time, I’ve decided to use [Feathers](https://feathersjs.com/), a [Node.js](https://nodejs.org/) framework oriented for building real-time applications and REST APIs. I've made an extensive use of the latest version of [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) on the backend and, used a few cool features of [Vue.js](https://vuejs.org/) on the frontend. Other modern development tools used are: [NPM](https://www.npmjs.com/) (the Node.js package manager), [Sequelize](https://sequelize.org/) (a promise-based Node.js ORM for relational databases), [MySQL](https://www.mysql.com/) server (for data storage), [Docker](https://www.docker.com/) (helps to create the necessary environment for developing or running the application) and, the [Swagger](https://swagger.io/) toolset (for exploring and interacting with the API). And, of course, I’ve used [Git](https://git-scm.com/) for code control version and, a basic knowledge of the [Unix Shell](https://en.wikipedia.org/wiki/Unix_shell) for interacting with the respective [CLI (command-line interface)](https://en.wikipedia.org/wiki/Command-line_interface) for Git, Docker and, Feathers. The full project has been developed on [macOS](https://www.apple.com/es/macos/what-is/) [Catalina](https://en.wikipedia.org/wiki/MacOS_Catalina) (v10.15.6) on top of a [MacBook Air mid 2012](https://support.apple.com/kb/SP670?viewlocale=en_US).

You can use this project for your needs under your total responsibility. You can, for example, fork it and, use as a foundation for your own project if you found it useful.

## Project introduction

The objective of this project is to provide a REST API to manage customer data for a small shop. It will work as the backend side for a [CRM](https://en.wikipedia.org/wiki/Customer_relationship_management) interface that is being developed by a different team.

### Mandatory implementation requirements

- The API should be only accessible by a registered user by providing an authentication mechanism.
- A user can only:
	- List all customers in the database.
	- Get full customer information, including a photo URL.
	- Create a new customer:
		- A customer should have at least name, surname, id and a photo field.
		- Name, surname and id are required fields.
		- Image uploads should be able to be managed.
		- The customer should have a reference to the user who created it.
	- Update an existing customer.
		- The customer should hold a reference to the last user who modified it.
	- Delete an existing customer.
- An admin can also:
	- Manage users:
		- Create users.
		- Delete users.
		- Update users.
		- List users.
		- Change admin status.
- Good code quality: Readability and simplicity, good semantics, idiomatic code and adoption of framework standards.
- Good software architecture: Low coupling, ease to change, good use of design patterns, use of framework or specific language patterns.
- Basic security measures (Authentication, Authorization, SQL injection and XSS prevention).

### Optional implementation requirements

- Good README file with a getting started guide.
- Tests implemented for the solution.
- Making project set-up easier for newcomers.
- The application follows the twelve-factor app principles [12factor.net](https:// 12factor.net) in order for it to be scalable.
- Follow [OAuth 2 protocol](https://oauth.net/2/) for authentication (using a third party public OAuth provider is allowed).
- The project is ready for [Continuous Deployment](https://en.wikipedia.org/wiki/Continuous_deployment) using a provider (e.g., [AWS](https://aws.amazon.com/)).
- The project uses [Docker](https://www.docker.com/), [Vagrant](https://www.vagrantup.com/) or other tools to make it easier to configure development environments.

### Proposed solution

As I said before, Feathers is the core framework for the project. I’ve decided to use it after a small research about the state of the art of current Node.js frameworks. Feathers is a lightweight web-framework for creating real-time applications and REST APIs using [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) or [TypeScript](https://www.typescriptlang.org/).

Feathers can interact with any backend technology, supports over a dozen databases and works with any frontend technology like [React](https://en.reactjs.org/), [VueJS](https://vuejs.org/), [Angular](https://angular.io/), [React Native](https://reactnative.dev/), [Android](https://www.android.com/) or [iOS](https://www.apple.com/es/ios/). In this project, the interface with the database is done thanks to [Sequelize](https://sequelize.org/) (a promise-based [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) for Node.js, that works with [Postgres](https://www.postgresql.org/), [MySQL](https://mysql.com/), [SQLite](https://www.sqlite.org/) and, [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server)). Sequelize also provides an effortless data validation and, much more. Feathers also can integrate with [Express](https://expressjs.com/) (a solid foundation currently used by almost any existing Node.js framework), something I decided to do, because it provides [better JSON error responses](https://docs.feathersjs.com/api/express.html#expresserrorhandler).

Feathers provides instant [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) functionality via [Services](https://docs.feathersjs.com/api/services.html), exposing both a RESTful API and real-time backend through [websockets](https://www.html5rocks.com/en/tutorials/websockets/basics/) automatically.

And, to finish, it also provides easy integration with more than 180 [OAuth](https://oauth.net/) providers. In this case, the project uses [GitHub](https://github.com/) as a third party OAuth provider.

So, my work was: first to known all this tools and technologies, understand how they work reading technical docs and finally, build it all together to provide the required functionality.

Also, it’s worth to mention that I’ve followed the security considerations detailed on the official [Feathers Guides](https://docs.feathersjs.com/guides/). In particular, there is [a full section about security](https://docs.feathersjs.com/guides/security.html). The following points of the security section are the relevant ones for this project:

- Using [hooks](https://docs.feathersjs.com/api/hooks.html) to check security roles to make sure users can only access data they should be permitted to.
- Escape any [SQL](https://en.wikipedia.org/wiki/SQL) (typically done by the SQL library) to avoid [SQL injection](https://en.wikipedia.org/wiki/SQL_injection). A major benefit for using an ORM, like Sequelize in this project, is that they make use of prepared statements, which is a technique to escape input in order to prevent SQL injection vulnerabilities. In June 2019, [Snyk](https://snyk.io/) (a company focused on security tools for developers) discovered [attack vectors that could lead to SQL injection](https://snyk.io/blog/sequelize-orm-npm-library-found-vulnerable-to-sql-injection-attacks/), the Sequelize maintainers promptly released fixes for the affected versions.
- [JSON Web Tokens (JWT’s)](https://jwt.io) are only signed. They are not encrypted. Therefore, the payload can be examined on the client. This is by design. DO NOT put anything that should be private in the JWT payload unless you encrypt it first.
- Don't use a weak secret for you token service. The generator creates a strong one for you automatically. No need to change it.
- Password storage inside `@feathersjs/authentication-local uses [bcrypt](https://en.wikipedia.org/wiki/Bcrypt). We don't store the salts separately since they are included in the bcrypt hashes.
- By default, JWT's are stored in [Local Storage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) (instead of [cookies](https://en.wikipedia.org/wiki/HTTP_cookie) to avoid [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery). For JWT, we use the HS256 algorithm by default (HMAC using SHA-256 hash algorithm). If you choose to store JWT's in cookies, your app may have CSRF vulnerabilities.

## Quick start guide

You need [Git](https://git-scm.com) >= `v2.24.3` and, [Docker Engine](https://docker.com/) >= `v18.06.0`.

```bash
$ git clone https://github.com/josepcrespo/the-agile-monkeys-api-test.git &&
  cd the-agile-monkeys-api-test &&
  docker-compose build --no-cache --force-rm &&
  docker-copose up
```

The project runs on [http://localhost:3030/](http://localhost:3030/).

## Project installation

> :warning: Currently, the Docker option for installing the project does not provide synchronization of files between the host and the Docker containers. So, you need to rebuild the Docker containers each time you change your files on your host and wants to show the changes on the application. Another thing to be aware of is that the data does not persist between `docker-compose down` and, `docker-compose up` command executions. So take this in consideration.

### Local

**Requirements**

- [Git](https://git-scm.com) >= `v2.24.3`. If your are a developer, you probably have Git already installed. If not, visit the [official downloads](https://git-scm.com/downloads) page as it provides appropriate instructions for different operating systems.

- [Node.js](https://nodejs.org/) >= `v10.0.0`. Feathers docs recommends to use the latest available version. The docs also recommend the use of [Node Version Manager](https://github.com/nvm-sh/nvm) (on macOS or other [Unix](https://en.wikipedia.org/wiki/Unix) based operating systems). Other methods for installing Node.js are:

<span style="color: transparent">⇢⇢⇢</span>⇢ Using the installer available on the [official downloads page](https://nodejs.org/en/downloads).

<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with macOS, you can use the [Homebrew](https://brew.sh/) package manager:

```bash
$ brew install node
```
<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with a Debian based operating system, the easiest way to install Node is using the [Advanced Packaging Tool](https://en.wikipedia.org/wiki/Advanced_Packaging_Tool) (a.k.a. APT). You need to install the node core and the package manager separately:

```bash
$ sudo apt install nodejs
```

```bash
$ sudo apt install npm
```

> :v: After a successful installation, the `node` (`nodejs` if using a Debian flavored Linux distro) and `npm` commands should be available on the terminal and show something similar when running the following commands:

```bash
$ node --version
v14.0.0
```
```bash
$ npm --version
v6.14.8
```

- A MySQL compatible server (the project has been developed with MySQL, probably it works with MariaDB, but this scenario has not been tested). This project has been developed using the version `5.7`. Versions greater than `5.7` have major changes on the authentication method used for connecting with the server that causes unnecessary headaches. For installing a MySQL server you have multiple options:

<span style="color: transparent">⇢⇢⇢</span>⇢ Manually downloading and installing the appropriate installer (you should choose the product version and, the operating system) from the [official downloads page](https://downloads.mysql.com/archives/community/).

<span style="color: transparent">⇢⇢⇢</span>⇢ Using an all-in-one package that provides you a MySQL server like: [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/) or, [MAMP](https://www.mamp.info/en/mac/).

<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with macOS, you can use the [Homebrew](https://brew.sh/) package manager:

```bash
$ brew install mysql@5.7
```

<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with a Debian based operating system, the easiest way to install a MySQL server is using APT:

```bash
$ sudo apt install mysql-server=5.7.29-0ubuntu0.18.04.1
```

When the installation is done, take note of your MySQL server connection parameters, you need to know:

- A database user with permissions.
- The database user password.
- The IP address or domain name of the server.
- The port number where the service is exposed.
- A database named `the_agile_monkeys_api_test`.

When you have this parameters at hand, you need to edit the `/config/default.json` file. Find the following line on the file:

```
"mysql": "mysql://root:@localhost:3306/the_agile_monkeys_api_test"
```

and, change it accordingly to your MySQL server connection parameters. The template is:

```
"mysql": "mysql://<user>:<password>@<ip_address>:<port_number>/<database_name>"
```

**Installation**

Open a shell and navigate where you want to install the project. Then execute:

```bash
$ git clone https://github.com/josepcrespo/the-agile-monkeys-api-test.git
```

Enter into the project root directory and install the dependencies:

```bash
$ npm install
```

### Docker

> :warning: Make sure you are not currently running any other service on your host that can interfere with the Docker services, for instance, a MySQL server or, a web server like NGINX or Apache. Since, the domain names and/or ports used could coincide and ruin the proper functioning of the application.

**Requirements**

- [Git](https://git-scm.com) >= `v2.24.3`. If your are a developer, you probably have Git already installed. If not, visit the [official downloads](https://git-scm.com/downloads) page as it provides appropriate instructions for different operating systems.

- [Docker Engine](https://docker.com/) >= `v18.06.0`. Just visit the [official Docker Desktop page](https://www.docker.com/products/docker-desktop) and, download the appropriate version for your operating system.

**Installation**

Open a shell and navigate where you want to install the project. Then execute:

```bash
$ git clone https://github.com/josepcrespo/the-agile-monkeys-api-test.git
```

Enter into the project root directory and execute the following command for downloading the necessary _Docker images_ and, building the _Docker containers_:

```bash
$ docker-compose build --no-cache --force-rm
```

> :warning: The process of downloading and, building can take a while depending on your internet connection download capacity and, the power of your development machine.

You don't need to worry about any dependencies because the project setup for Docker, installs everything you need to run the project.

**Useful commands**

The code between your host and the Docker containers does not syncronize at this moment. If you need to change the code base and want to see the changes on the Docker container, you need to re-build the containers first. Execute the following command on the root directory of the project:

```bash
$ docker-copose up --build
```

If you want to stop the containers running the project, execute this command on the root directory of the project:

```bash
$ docker-compose down
```

## Run the project

The API is exposed at [http://localhost:3030/](http://localhost:3030/) after executing anyone of the following commands to run the application.

### Run locally

- **Development server**

Navigate to the project root directory and execute:

```bash
$ npm run dev
```

You need to keep this shell open and, you can see if any log appears during the execution of the application.

- **Production mode**

Navigate to the project root directory and execute:

```bash
$ npm run start
```

### Run on Docker

- **Development server**

By default, the project runs in development mode when using Docker. Just navigate to the project root directory and execute:

```bash
$ docker-compose up
```

You need to keep this shell open and, you can see if any log appears during the execution of the application.

- **Production mode**

You need to change the `Dockerfile` located at `/dockerfiles/node_runtime/Dockerfile`. Open it an chage this line:

```
CMD ["npm", "run", "dev"]
```
with this one:

```
CMD ["npm", "run", "start"]
```

and, finally:

```bash
$ docker-compose up -d
```

Using the `-d` option, the server runs in background.

## GitHub Oauth login

Feathers provides "[Login with GitHub](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)" functionality using OAuth 2.0, out of the box without much effort.

OAuth is an open authentication standard supported by almost every major platform. It is what is being used by the login with Facebook, Google, GitHub and, all this kind of buttons in a web application. From the Feathers perspective the authentication flow is pretty similar. Instead of authenticating with the local strategy by sending a username and password, we direct the user to authorize the application with the login provider. If it is successful we find or create the user on the users service with the information we got back from the provider and issue a token for them.

After a successful login the third party provider (GitHub in our case), will redirect back the user to our application with a valid JWT or, an error message in other case.

In order to log in with GitHub, visit [http://localhost:3030/oauth/github](http://localhost:3030/oauth/github). You will be redirected to GitHub and asked to authorize the authentication into our application, using your GitHub account. If everything went well, you will see a JWT, valid for 24 hours, that you can use for making requests to the API endpoints that require authentication. Keep in mind that all users are created with "user" role permissions as default (this role only can operate with the `/customers` service).

![GitHub Oauth login](readme_images/github-oauth-login.gif)

> :exclamation: You need to enter [github.com](https://github.com/) and, logout from your session if you want to test the full "Login with GitHub" flow again. Or, you can just visit [http://localhost:3030/oauth/github](http://localhost:3030/oauth/github) all the times you want to obtain a new valid JWT, without GitHub asking again for authorization.

## REST API documentation

### Pre-configured users

The project comes with two users already registered so you can easily start to test the API. One user comes with “admin” privileges (this user role can perform any operation with the API) and, the other one only has “user” privileges (this user role only allows to interact with the `/customers` service).

**Admin user:**

```
{
	"email": "admin@theagilemonkeys.com",
	"password": "asdf1234",
	"permissions": "admin"
}
```

**Basic user:**

```
{
	"email": "user@theagilemonkeys.com",
	"password": "asdf1234",
	"permissions": "user"
}
```

If you want to test `/authorization` endpoint for login with a user, you need to set the `strategy` property to `local` and, of course, provide valid credentials as shown above. Below is an example of a `body` that should be sent using the POST method to the indicated endpoint:


```bash
{
	"strategy": "local",
	"email": "user@theagilemonkeys.com",
	"password": "asdf1234"
}
```

### Feathers CRUD

Feathers service methods that provide CRUD functionality are:

- `find`: Find all data (potentially matching a query).
- `get`: Get a single data entry by its unique identifier.
- `create`: Create new data.
- `update`: Update an existing data entry by completely replacing it.
- `patch`: Update one or more data entries by merging with the new data.
- `remove`: Remove one or more existing data entries.

When used as a REST API, incoming requests get mapped automatically to their corresponding service method like this:

| Service method                              | HTTP method | Path                  |
|:---                                         |:---         |:---                   |
| service.find({ query: {} })                 | GET         | /users                |
| service.find({ query: { githubId: true } }) | GET         | /users?=email=user@theagilemonkeys.com |
| service.get(2)                              | GET         | /users/2              |
| service.create(body)                        | POST        | /users                |
| service.update(2, body)                     | PUT         | /users/2              |
| service.patch(2, body)                      | PATCH       | /users/2              |
| service.remove(2)                           | DELETE      | /users/2              |

### Swagger UI docs

![Swagger UI docs](readme_images/swagger-ui-docs.gif)

The project comes with a full Swagger UI setup so, you can play with the API directly on the docs page: [http://localhost:3030/docs/swagger-ui.html](http://localhost:3030/docs/swagger-ui.html). All Feathers services exposed by the API have their own documentation for each method, examples, live execution of queries and, their respective responses.

Swagger UI allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from our OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.

You can visit [http://localhost:3030/docs/swagger-ui.html](http://localhost:3030/docs/swagger-ui.html) to see it in action and, perform almost any operation available on the API or, just explore it. Just keep in mind that all endpoinds require authentication, so you need to provide your credentials using the “Authorize” button placed on the top right of the page.

> :warning: **You need a local client for consuming APIs**, such as _Postman API Client_ or _Insmonia Core_ **for using the JWT provided by GitHub Oauth to authenticate API requests**.

> :warning: **You need a local client for consuming APIs**, such as _Postman API Client_ or _Insmonia Core_ **to test image upload in the `/customers` service**.

### Run with Postman API Client

Click on the button below for importing a _Postman Collection_ into your Postman API Client. The _Collection_ is built with all the API endpoints so you can test everything the API exposes with this great tool.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1859282581eec69ec6b6)

> :eyes: Remember to set a valid JWT on the _Authorization_ tab of a Postman request (if the request requires authentication) using the _Bearer token_ option.

<mark>TODO: provide examples with _Postman API Client_ and/or _Insomnia Core_.</mark>

<mark>TODO: provide an example creating a user with a photo using _Postman API Client_ and/or _Insomnia Core_.</mark>

## ToDo List

- [ ] Improve the README.md file as much as possible.
- [ ] Write Unit Tests.
- [ ] Automatically synchronize the files between the host and the Docker containers and, vice versa.
- [ ] Make possible the use of JWT to authorize API calls on the Swagger UI.
- [ ] Persist data of Docker containers once they were down.

## Bibliograpy

### Feathers

### Sequelize

### Swagger

### Docker

