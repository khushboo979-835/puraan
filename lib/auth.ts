import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { User, IUser } from '@/models';
import { connectToDatabase } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'sacred_reads_super_secret_jwt_key_2026_devotional_drm';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function signJwtToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyJwtToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export async function getCurrentUser(request: NextRequest): Promise<IUser | null> {
  try {
    // 1. Check Authorization header
    let token = '';
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    // 2. Check Cookie
    if (!token) {
      const cookie = request.cookies.get('sacred_auth_token');
      if (cookie) {
        token = cookie.value;
      }
    }

    if (!token) return null;

    const payload = verifyJwtToken(token);
    if (!payload || !payload.userId) return null;

    try {
      await connectToDatabase();
      const user = await User.findById(payload.userId).populate('purchasedBooks');
      return user;
    } catch {
      return null;
    }
  } catch (err) {
    console.error('Error fetching current user:', err);
    return null;
  }
}
