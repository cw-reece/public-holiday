# Project Name: Country Holiday App

## What this app does

Select a country and it will give you all the dates of the holiday for the coming year.

## User problem

User needed accurate dates for holidays in order to plan their PTO.

## Core workflow

The user comes to the site and it load the default country (Netherlands) and it shows their Holidays organized by Date

## Data model

Country:

- isoCode: string
- name: translated display name

Holiday:

- id: string, when available
- startDate: YYYY-MM-DD string
- name: translated display name

## Technical choices

n/a

## Edge cases handled

The edge cases are the various states of loading and if the Country of
choice has no holidays in the API.

## How to run ##

npm run dev

## How to test

n/a

## Known gaps

testing does not currently occur. Their is also no backend, limiting the reusable
functionality. In future iterations, the backend could save countries to user
and make recommendations of the best
time blocks to use PTO to maximize value.
