import Keycloak from 'keycloak-js';

// Initialize Keycloak instance
const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'master',
  clientId: 'web-client',
});

// Initialize Keycloak login
export const initializeKeycloak = () =>
  new Promise((resolve, reject) => {
    keycloak.init({
      //onLoad: 'login-required',
      pkceMethod: 'S256',
      checkLoginIframe: false,
      redirectUri: 'http://localhost:5173/'
    }).then(authenticated => {
        if (authenticated) {
          resolve(keycloak);
        } else {
          reject('User not authenticated');
        }
      })
      .catch(error => {
        reject(error)
      });
  });

export default keycloak;