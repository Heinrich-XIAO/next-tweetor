import { NextResponse } from 'next/server';

export function middleware(req) {
  const response = NextResponse.next();  
  return response;
}
