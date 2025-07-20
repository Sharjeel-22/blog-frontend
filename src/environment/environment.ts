export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api/v1',
    apiBaseUrl: 'http://localhost:3000',

    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            profile: '/auth/profile',
            test: '/auth/test'
        },
        users: {
            list: '/users',
            create: '/users',
            update: '/users',
            delete: '/users'
        }
    },

    appName: 'Blog App',
    version: '1.0.0',
    tokenKey: 'blog_auth_token',
    tokenExpiry: '24h'
};