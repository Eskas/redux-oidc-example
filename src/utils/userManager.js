import { createUserManager } from 'redux-oidc';

//const userManagerConfig = {
//  client_id: '581912277515-8pqeloei552og7pa13iufb57iug8vu9k.apps.googleusercontent.com',
//  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
//  response_type: 'token id_token',
//  scope: 'openid profile https://www.googleapis.com/auth/youtube.readonly',
//  authority: 'https://accounts.google.com',
//  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
//  automaticSilentRenew: true,
//  filterProtocolClaims: true,
//  loadUserInfo: true,
//};

const userManagerConfig = {
  client_id: '2d27c380-eebe-0138-efdf-06835c02825837817',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile',
  authority: 'https://bonniernews.onelogin.com/oidc/2',
  //metadata: {
  //  issuer: 'https://openid-connect-eu.onelogin.com/oidc/2',
  //  authorization_endpoint: 'https://openid-connect-eu.onelogin.com/oidc/2/auth',
  //  userinfo_endpoint: 'https://openid-connect-eu.onelogin.com/oidc/2/me',
  //  jwks_uri: 'https://openid-connect-eu.onelogin.com/oidc/2/certs',
  //},
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};
const userManager = createUserManager(userManagerConfig);

export default userManager;
