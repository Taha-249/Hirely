// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key';

export function middleware(request) {
  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch (err) {
    console.error('Invalid Token', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/applyJob'],
};
