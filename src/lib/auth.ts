import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { authService, AuthApiError } from '@/services/auth-service';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await authService.refresh({
      refresh_token: token.refreshToken,
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token if not returned
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in ?? 3600) * 1000,
      tokenType: refreshedTokens.token_type ?? 'Bearer',
      error: undefined,
    };
  } catch (error: any) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'laura.hills@campusos.edu' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password.');
        }

        try {
          const response = await authService.login({
            email: credentials.email.trim(),
            password: credentials.password,
          });

          if (response?.success && response?.data) {
            const data = response.data;
            const user = {
              id: data.active_role?.id || credentials.email,
              email: credentials.email,
              name: data.active_role?.name || credentials.email.split('@')[0],
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              expiresIn: data.expires_in,
              tokenType: data.token_type,
              activeRole: data.active_role,
              availableWorkspaces: data.available_workspaces,
            };
            return user;
          }

          throw new Error(response?.message || 'Authentication failed.');
        } catch (error: any) {
          if (error instanceof AuthApiError) {
            throw new Error(error.message);
          }
          throw new Error(error.message || 'Unable to connect to authentication server.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + (user.expiresIn ?? 3600) * 1000;
        token.tokenType = user.tokenType ?? 'Bearer';
        token.activeRole = user.activeRole;
        token.availableWorkspaces = user.availableWorkspaces;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
        return token;
      }

      // Handle session updates (e.g. workspace switch or manual token refresh)
      if (trigger === 'update' && session) {
        if (session.activeRole) token.activeRole = session.activeRole;
        if (session.availableWorkspaces) token.availableWorkspaces = session.availableWorkspaces;
      }

      // Return previous token if the access token has not expired yet (with 60s buffer)
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires - 60 * 1000) {
        return token;
      }

      // Access token has expired or is about to expire, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.tokenType = token.tokenType;
      session.error = token.error;
      session.activeRole = token.activeRole;
      session.availableWorkspaces = token.availableWorkspaces;

      if (token.user) {
        session.user = {
          ...session.user,
          id: token.user.id,
          email: token.user.email,
          name: token.user.name,
          activeRole: token.activeRole,
          availableWorkspaces: token.availableWorkspaces,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'academic-planner-super-secret-production-key-2026',
};
