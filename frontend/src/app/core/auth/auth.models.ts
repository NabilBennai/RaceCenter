export interface AuthUser {
  id: number;
  email: string;
  username: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
  emailVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: AuthUser;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MessageResponse {
  message: string;
}
