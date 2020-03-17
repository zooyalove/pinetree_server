declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE: string;
    SECRET_KEY: string;
    HASH_SALT: string;
  }
}
