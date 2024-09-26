// import { development } from "./development";
// import { production } from "./production";

const paths = {
  dev: `us7-cluster.hoolva.com`,
  test: `us3-test.ncsapp.com`,
  local: `us7-cluster.hoolva.com`,
  keycloak: "us1dev-ncs.kanimango.com",
  stagging_us2: "us2-stage.ncsapp.com",
  production: `ncsapp.com`,
};
const dev = {
  env: "develop",
  path: paths.dev,
  baseURL: `https://${paths.dev}/v2/`,
  domain: `${paths.dev}/portal/`,
  keyCloak: `https://${paths.keycloak}/auth/`,
  wssProtocol: `pbx-protocol`,
  download: `https://${paths.dev}/v2/api/download/`,
  multiTenant: false,
  // config: development
};
const test = {
  env: "testing",
  path: paths.test,
  baseURL: `https://${paths.test}/v2/`,
  domain: `${paths.test}/portal`,
  keyCloak: `https://${paths.keycloak}/auth/`,
  wssProtocol: `pbx-protocol`,
  download: `https://${paths.test}/v2/api/download/`,
  multiTenant: false,
  //   config: development,
};

const local = {
  env: "localhost",
  path: paths.local,
  baseURL: `https://${paths.local}/v2/`,
  domain: `${paths.local}/portal`,
  keyCloak: `https://${paths.keycloak}/auth/`,
  wssProtocol: `pbx-protocol`,
  download: `https://${paths.local}/v2/api/download/`,
  multiTenant: false,
  //   config: development,
};

export function getENVData() {
  let text = window.location.hostname;
  if (text.includes(paths.dev)) {
    return dev;
  } else if (text.includes(paths.test)) {
    return test;
  } else {
    return local;
  }
}
