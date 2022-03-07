export function isWhitelisted(email?: string) {
  return email && (email.endsWith('@theoremone.co') || isAdmin(email))
}

export function isAdmin(email: string) {
  const ADMINS = [
    'akrolsmir@gmail.com', // Austin
    'jahooma@gmail.com', // James
    'taowell@gmail.com', // Stephen
    'manticmarkets@gmail.com', // Manifold
  ]
  return ADMINS.includes(email)
}

const ENV = process.env.NEXT_PUBLIC_FIREBASE_ENV ?? 'PROD'

export const DOMAINS = {
  PROD: 'manifold.markets',
  DEV: 'manifold.markets',
  THEOREMONE: 'theoremone.manifold.markets',
}

export const FIREBASE_CONFIGS = {
  PROD: {
    apiKey: 'AIzaSyDp3J57vLeAZCzxLD-vcPaGIkAmBoGOSYw',
    authDomain: 'mantic-markets.firebaseapp.com',
    projectId: 'mantic-markets',
    storageBucket: 'mantic-markets.appspot.com',
    messagingSenderId: '128925704902',
    appId: '1:128925704902:web:f61f86944d8ffa2a642dc7',
    measurementId: 'G-SSFK1Q138D',
  },
  DEV: {
    apiKey: 'AIzaSyBoq3rzUa8Ekyo3ZaTnlycQYPRCA26VpOw',
    authDomain: 'dev-mantic-markets.firebaseapp.com',
    projectId: 'dev-mantic-markets',
    storageBucket: 'dev-mantic-markets.appspot.com',
    messagingSenderId: '134303100058',
    appId: '1:134303100058:web:27f9ea8b83347251f80323',
    measurementId: 'G-YJC9E37P37',
  },
  THEOREMONE: {
    apiKey: 'AIzaSyBSXL6Ys7InNHnCKSy-_E_luhh4Fkj4Z6M',
    authDomain: 'theoremone-manifold.firebaseapp.com',
    projectId: 'theoremone-manifold',
    storageBucket: 'theoremone-manifold.appspot.com',
    messagingSenderId: '698012149198',
    appId: '1:698012149198:web:b342af75662831aa84b79f',
    measurementId: 'G-Y3EZ1WNT6E',
  },
}

// @ts-ignore
export const DOMAIN = DOMAINS[ENV]
// @ts-ignore
export const PROJECT_ID = FIREBASE_CONFIGS[ENV].projectId
