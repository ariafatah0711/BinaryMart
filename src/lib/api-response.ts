import { NextResponse } from 'next/server';

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, init);
}

export function fail(message: string, status = 500, details?: unknown) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status }
  );
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Unexpected server error';
}
