# Local Development

## Setting up Node

This project was built with and supports Node version 16.17.1

### **Installing Node version manager (Mac/Linux)**

Use nvm to easily install and switch different node versions.  Go to [https://github.com/nvm-sh/nvm#install--update-script](https://github.com/nvm-sh/nvm#install--update-script) to get the latest install script.

The install command for the current release as of writing this document is:  
> `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

### **Installing Node version manager (Windows)**

Head to [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases) to download and install the latest release.

### **Common nvm commands**

- Install node version: `nvm install 16.17.1`
- Switch node version: `nvm use 16.17.1`
- Switch to default version: `nvm use node`

## Migrations with TypeORM

To generate a new migration file:
> `npm run typeorm migration:create ./src/common/migration/{nameoffilehere}`

<br>

To run available migration files:
> `npm run typeorm migration:run`
