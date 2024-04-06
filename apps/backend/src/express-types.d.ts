// express-types.d.ts
// import 'cookie-session';

// declare module "cookie-session" {
//   interface CookieSessionObject {
//     username?: string;
//   }
// }

// declare namespace CookieSessionInterfaces {
//   interface CookieSessionObject {
//     username?: string;
//   }
// }

// custom-types.d.ts




import "express-session";

declare module "express-session" {
  interface SessionData {
    username?: string;
  }
}
