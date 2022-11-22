# Functional Requirements

## User Functionality

- Sign up/create new user
- Sign in as existing user
- Sign in with Google account?
- Sign in with Apple account?
- Confirm email address during sign up
- Get details of current user
- Update user details
- Terminate user account (delete personal data, keep metrics)
- Reset forgotten password
- 2FA with SMS codes?

## Recipe Functionality

- Create new recipe record
- Fetch all recipe record created by current user
- Fetch one recipe record by id
- Update an existing recipe record by id
- Delete recipe record by id
- Share/send a recipe record (email, pdf, custom file?)
- Search for recipe records by keyword, ingredient, tags, etc
- Filter recipes by tags, ingedients, etc
- Adjust recipes amounts by altering servings?

## Tags Functionality

- Pre-defined allergen tags to easily filter recipes
- Recipes can have custom tags attached in addition to the pre-defined tags

## Reporting Functionality

- Admin reporting includes anonymous tracking of key metrics:
  - country
  - platform
  - active/inactive users

- Optional opt-in user survey to collect demographic metrics:
  - Age (range?)
  - Gender
  - Marital status
  - Locale/Region?

## Subscription Functionality

☐ Free tier + paid tier
☐ Free tier limited to ten recipes and premium features disabled
☐ Low-cost membership to unlock premium features:
  ☐ allergen/custom tags
  ☐ unlimited recipe storage
  ☐ color themes?
  
## Insights Functionality

☐ Client-facing reporting for cookbook insights:
  ☐ total number of recipes in account
  ☐ number of recipes by ingredient
  ☐ ???

## Admin Functionality

☐ Fetch all recipe records in DB
☐ Fetch all user records in DB
☐ Fetch all user subscriptions in DB
☐ Delete user by username
☐ Clear all tables
☐ Fetch subscription record by user ID
☐ Fetch recipe records by user ID
