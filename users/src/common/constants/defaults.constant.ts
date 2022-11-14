export const ENVIRONMENT = process.env.ENVIRONMENT;
export const USER_GATEWAY_PORT = parseInt(process.env.USER_GATEWAY_PORT);
export const USER_CORS_ORIGIN = process.env.USER_CORS_ORIGIN;
export const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT;
export const USER_SERVICE_HOST = process.env.USER_SERVICE_HOST;
export const PASSWORD_MIN_LENGTH = parseInt(process.env.PASSWORD_MIN_LENGTH);
export const PASSWORD_MAX_LENGTH = parseInt(process.env.PASSWORD_MAX_LENGTH);
export const USERNAME_MIN_LENGTH = parseInt(process.env.USERNAME_MIN_LENGTH);
export const USERNAME_MAX_LENGTH = parseInt(process.env.USERNAME_MAX_LENGTH);
export const NAME_MIN_LENGTH = parseInt(process.env.NAME_MIN_LENGTH);
export const NAME_MAX_LENGTH = parseInt(process.env.NAME_MAX_LENGTH);
export const EMAIL_MAX_LENGTH = parseInt(process.env.EMAIL_MAX_LENGTH);
export const PHONE_NUMBER_MIN_LENGTH = parseInt(process.env.PHONE_NUMBER_MIN_LENGTH);
export const PHONE_NUMBER_MAX_LENGTH = parseInt(process.env.PHONE_NUMBER_MAX_LENGTH);
export const GROUPS_MAX_SIZE = parseInt(process.env.GROUPS_MAX_SIZE);
export const MAX_TIME_OF_REQUEST_WAITING = parseInt(process.env.MAX_TIME_OF_REQUEST_WAITING);
export const MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE;
export const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
export const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
export const USERS_DB_PORT = parseInt(process.env.USERS_DB_PORT);
export const USERS_DB_DSN = process.env.USERS_DB_DSN
  .replace('${MONGO_INITDB_DATABASE}', MONGO_INITDB_DATABASE)
  .replace('${MONGO_INITDB_ROOT_USERNAME}', MONGO_INITDB_ROOT_USERNAME)
  .replace('${MONGO_INITDB_ROOT_PASSWORD}', MONGO_INITDB_ROOT_PASSWORD)
  .replace('${USERS_DB_PORT}', String(USERS_DB_PORT));
