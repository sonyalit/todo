export interface User {
    username:string;
}
export interface AuthState {
    authChecked: boolean;
    user?: User | null;
    loginFormError?: string | null;
  }
  export interface Credentials {
    username: string;
    password: string;
  }
