# API Endpoints

## /admin

- ### DELETE /admin/cleartables

  Clear all DB tables.

- ### GET /admin/recipes

  Fetch all recipe records.

- ### GET /admin/users

  Fetch all user records.

- ### DELETE /admin/users/:username

  Delete user record by username.

- ### GET /admin/subscriptions

  Fetch all subscription records.

- ### GET /admin/:id/subscription

  Fetch subscription record for given user ID.

## /auth

- ### /auth/confirmmail

  Confirm email address of an existing user.

- ### /auth/signin

  Sign in an existing user.

- ### /auth/signout

  Log out of the current user.

- ### /auth/signup

  Sign up as a new user.

<br>

## /api/v1/insights

<br>

## /api/v1/recipes

- ### /api/v1/recipes/

  Get all recipes from db

- ### /api/v1/recipes/:id

  Get details of one recipe by ID

<br>

## /api/v1/reporting

<br>

## /api/v1/users

- ### GET /api/v1/users/findCurrent

  Return user record for currently authenticated user

- ### GET /api/v1/users/:id

  Return user record for currently authenticated user

