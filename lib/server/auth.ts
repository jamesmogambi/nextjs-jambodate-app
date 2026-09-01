import { getAdminAuth } from './firebaseAdmin';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function verifyAuthToken(idToken: string): Promise<string> {
  if (!idToken) {
    throw new AuthError('Missing authentication token.');
  }
  const auth = getAdminAuth();
  try {
    const decoded = await auth.verifyIdToken(idToken);
    if (!decoded.uid) {
      throw new AuthError('Token is missing a user id.');
    }
    return decoded.uid;
  } catch (err) {
    throw new AuthError('Invalid or expired authentication token.');
  }
}
