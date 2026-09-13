import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';
import { ActiveRole, Workspace } from './auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    tokenType?: string;
    error?: string;
    activeRole?: ActiveRole;
    availableWorkspaces?: Workspace[];
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      activeRole?: ActiveRole;
      availableWorkspaces?: Workspace[];
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    activeRole?: ActiveRole;
    availableWorkspaces?: Workspace[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    tokenType?: string;
    error?: string;
    activeRole?: ActiveRole;
    availableWorkspaces?: Workspace[];
    user?: {
      id?: string;
      email?: string;
      name?: string;
    };
  }
}
