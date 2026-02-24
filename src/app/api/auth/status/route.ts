import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = 'app_EMoamEEZ73f0CkXaXp7hrann';
const TOKEN_URL = 'https://auth.openai.com/oauth/token';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('chatgpt_access_token')?.value;
  const refreshToken = req.cookies.get('chatgpt_refresh_token')?.value;
  const expiresAt = req.cookies.get('chatgpt_expires_at')?.value;

  // Check if token exists and is NOT expired
  const isExpired = expiresAt ? Date.now() >= Number(expiresAt) : false;

  if (accessToken && !isExpired) {
    return NextResponse.json({
      authenticated: true,
      expiresAt: expiresAt ? Number(expiresAt) : null,
    });
  }

  // Token missing or expired — try refresh
  if (refreshToken) {
    try {
      const refreshResponse = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: CLIENT_ID,
          refresh_token: refreshToken,
        }).toString(),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;

        const response = NextResponse.json({
          authenticated: true,
          expiresAt: newExpiresAt,
        });

        response.cookies.set('chatgpt_access_token', data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: data.expires_in || 3600,
        });

        if (data.refresh_token) {
          response.cookies.set('chatgpt_refresh_token', data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
          });
        }

        response.cookies.set('chatgpt_expires_at', String(newExpiresAt), {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: data.expires_in || 3600,
        });

        return response;
      } else {
        console.error('[auth/status] Token refresh failed:', refreshResponse.status);
      }
    } catch (err) {
      console.error('[auth/status] Token refresh error:', err);
    }
  }

  // Clear stale cookies if we couldn't refresh
  const response = NextResponse.json({ authenticated: false });
  response.cookies.delete('chatgpt_access_token');
  response.cookies.delete('chatgpt_expires_at');
  return response;
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('chatgpt_access_token');
  response.cookies.delete('chatgpt_refresh_token');
  response.cookies.delete('chatgpt_expires_at');
  return response;
}
