# Recipes Backend

```text
recipes-backend
├── src
│   ├── admin  
│   │   ├── admin.controller.ts   
│   │   ├── admin.module.ts  
│   │   └── admin.service.ts    
│   ├── api
│   │   ├── insights                                // /api/v1/insights endpoint files
│   │   │   ├── dto
│   │   │   │   └── allergen-count.dto.ts
│   │   │   ├── insights.controller.ts
│   │   │   ├── insights.module.ts
│   │   │   └── insights.service.ts
│   │   ├── recipes                                 // /api/v1/recipes endpoint files
│   │   │   ├── dto
│   │   │   │   └── create-recipe.dto.ts
│   │   │   ├── recipes.controller.ts
│   │   │   ├── recipes.module.ts
│   │   │   ├── recipes.service.ts
│   │   │   └── requests.http
│   │   ├── reporting                               // /api/v1/reporting endpoint files
│   │   │   ├── reporting.controller.ts
│   │   │   ├── reporting.module.ts
│   │   │   └── reporting.service.ts
│   │   └── users                                   // /api/v1/users endpoint files
│   │       ├── dto
│   │       ├── requests.http
│   │       ├── user-subscription.service.ts
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.service.ts 
│   ├── auth                                        // /auth endpoint files
│   │   ├── dto
│   │   │   ├── create-user.dto.ts                  // used to validate user signup data
│   │   │   └── sing-in.dto.ts                      // used to validate user signin data
│   │   ├── jwt
│   │   │   ├── jwt-payload.interface.ts            // used to structure the JWT payload
│   │   │   └── jwt-strategy.ts                     // jwt strategy configuration
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── common
│   │   ├── decorators                              // place decorator files here
│   │   │   └── get-user.decorator.ts
│   │   ├── dtos                                    // place shared DTO files here
│   │   │   └── http-response.dto.ts
│   │   ├── entities                                // place entity here
│   │   │   ├── enums                               // place enumerators here
│   │   │   │   ├── demographics
│   │   │   │   │   ├── user-education-level.enum.ts  
│   │   │   │   │   ├── user-employment-status.enum.ts
│   │   │   │   │   ├── user-gender.enum.ts
│   │   │   │   │   ├── user-income-range.enum.ts
│   │   │   │   │   └── user-marital-status-enum.ts
│   │   │   │   ├── user-platform.enum.ts
│   │   │   │   └── user-type.enum.ts
│   │   │   ├── country.entity.ts
│   │   │   ├── demographic-info.entity.ts
│   │   │   ├── ingredient.entity.ts
│   │   │   ├── instruction-step.entity.ts
│   │   │   ├── recipe-ingredient.entity.ts
│   │   │   ├── recipe.entity.ts
│   │   │   ├── user-login-record.entity.ts
│   │   │   ├── user-subscription.entity.ts
│   │   │   └── user.entity.ts
│   │   ├── envs                                    // env config files
│   │   │   ├── .env
│   │   │   ├── config.schema.ts                    // used to validate the data in an .env file
│   │   │   ├── development.env
│   │   │   ├── production.env
│   │   │   └── env.helper.ts                       // DEFUNCT: used to auto-load correct .env file based on active environment
│   │   ├── guards                                  // place guard files here
│   │   │   ├── admin.guard.ts                      // 
│   │   │   └── premium.guard.ts                    // 
│   │   ├── interceptors                            // place interceptor files here
│   │   │   └── transform.interceptor.ts            // transforms class object in response to plain object
│   │   ├── interfaces                              // place interface files here
│   │   │   └── env.config.interface.ts
│   │   ├── services                                // place service files here
│   │   │   └── typeorm.service.ts
│   │   └── data.source.ts                          // data source and connection config
│   ├── app.module.ts                               // main module of app
│   └── main.ts                                     // main entry point of app
├── .eslintrc.js                                    // ESLint config 
├── .gitignore                                      // standard gitignore file
├── .prettierrc                                     // Prettier config
├── nest-cli.json
├── openapi.yaml                                    // Swagger/OpenAPI file
├── package.json                                    // node module dependencies
├── README_Development.md                           // Local development information
├── README_Endpoints.md                             // API endpoints information
├── README_Functionality.md                         // App functionality information
├── README_Nest.md                                  // NestJS information
├── README_Testing.md                               // Testing information
├── README.md                                       // This file
└── tsconfig.json                                   // TypeScript compiler options
```
