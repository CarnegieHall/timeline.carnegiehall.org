# Carnegie Hall Music Timeline

Frontend of the music timeline for Carngie Hall's history of African American music, available at [timeline.carnegiehall.org](https://timeline.carnegiehall.org).

Backend code available at [github.com/CarnegieHall/timeline.carnegiehall.org-cms](https://github.com/CarnegieHall/timeline.carnegiehall.org-cms).

## Release Notes

### 1.0.0

- Initial release based on the code of [The Timeline of African American Music](https://timeline.carnegiehall.org) released on January 2022.
-  Code contains structural elements but not specific data (images, text, values) associated with the Timeline of African American Music.
- This code is provided “as is” and for you to use at your own risk. The information included in the contents of this repository is not necessarily complete. Carnegie Hall offers the scripts as-is and makes no representations or warranties of any kind.
- Support or maintenance for use and modification is not provided. Future updates will be released at will.

## Local development

- Clone this repository
- Install dependencies with `npm`
- Run `npm dev` to start up local development server on `localhost:3000`
- Work on the design system with `npm run storybook`, on `localhost:3002`
- Build locally with `npm run build`

## Built with

- NextJS 11 / React 17 / Webpack 5
- Typescript
- Tailwind CSS
- [Storybook](https://storybook.js.org/) for design system documentation
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for tests
- [Hygen](https://www.hygen.io/) for code scaffolding
- [Prettier](https://prettier.io/) for consistent code formatting

## Technical Notes

- Aliases for `src/..` `@types/..` and `.storybook/..` have been added as `$src`, `$types`, and `$storybook` to avoid requiring `../../../` style fragile import statements on nested components/pages/etc.
- Every component should have associated stories in a `[component].stories.ts` file to document its usage and create a sandbox in Storybook
- Given time constraints we're not doing much unit or integration testing, but where possible provide tests for crucial pieces of infrastructure so broken builds can't be promoted to production
- Ensure [Prettier](https://prettier.io/) is set up in your IDE to maintain a consistent code style throughout the project

## License

MIT
