import { convexAuth } from '@convex-dev/auth/server';
import { Password } from '@convex-dev/auth/providers/Password';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params, tokens) {
        return {
          name: params.name as string,
          email: params.email as string,
          gender: params.gender as string,
        };
      },
      validatePasswordRequirements(password) {
        console.log('Validating password requirements...');

        if (!password || password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        } 
        console.log('Password validation passed');
      },
    }),
  ],

  callbacks: {
    async redirect({ redirectTo }) {
      console.log('Redirect callback called with:', redirectTo);

      const siteUrl = process.env.SITE_URL!;
      const expoUrl = process.env.EXPO_URL!; // must be set in .env (e.g., bna:// in production)

      const isExpoDevUrl = redirectTo.startsWith('exp://'); // dev URLs
      const isExpoProdUrl = redirectTo.startsWith(expoUrl); // uses .env (bna:// in prod)
      const isSiteUrl = siteUrl && redirectTo.startsWith(siteUrl);

      if (isExpoDevUrl || isExpoProdUrl || isSiteUrl) {
        console.log('Redirect approved:', redirectTo);
        return redirectTo;
      }

      console.error('Invalid redirect URL:', redirectTo);
      throw new Error(`Invalid redirectTo URI ${redirectTo}`);
    },
  },
});
