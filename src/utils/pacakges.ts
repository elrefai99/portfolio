export const packages = [
     {
          id: 1,
          title: "data-localizer",
          image: "/images/packages/error-handler.png",
          category: "Backend Tools",
          description: `A lightweight utility to localize JSON objects and arrays using language fields (e.g. "{"ar": "...", "en": "..."}") and an HTTP language header.  Works out of the box with **ISO 639-1** language codes (e.g., "en", "ar", "fr", …) and safely falls back when a language isn’t supported.`,
          github: "https://github.com/elrefai99/data-localizer",
          npm: "https://www.npmjs.com/package/data-localizer",
          tech: "Express.js, TypeScript",
          sections: [
               {
                    title: "Features",
                    points: [
                         "Centralized error handling for Express",
                         "Custom error messages and codes",
                         "Full TypeScript support"
                    ]
               },
               {
                    title: "Installation",
                    points: ["npm install express-error-handler"]
               },
               {
                    title: "Usage Example",
                    points: [
                         "import { errorHandler } from 'express-error-handler';",
                         "app.use(errorHandler());"
                    ]
               }
          ]
     },
]
