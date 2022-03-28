const hostname = window.location.hostname;

const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    basename: '/',
    defaultPath: '/dashboard',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    baseURL: hostname === 'localhost' ? 'http://localhost:5000/' : 'https://ifp-node-backend.herokuapp.com/'
};

export default config;
