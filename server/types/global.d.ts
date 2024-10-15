interface UserObject {
    id: string
    username: string
    // Add any other properties you need
}

// declare global {
//     namespace Express {
//         interface Request {
//             user?: UserObject
//         }
//     }
// }

// export{}
declare global {
    namespace Express {
      export interface Request {
        user?: string | null;
        // userRole?: 'customer' | 'admin' | 'restaurant'
        // role?: 'customer' | 'admin' | 'restaurant'
        // error?: string | null
      }
    }
  }