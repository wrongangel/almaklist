import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/models/supabase'

export async function middleware (req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  if (req.nextUrl.pathname.startsWith('/application') && session === null) {
    const redirectRes = NextResponse.redirect(new URL('/login', req.url))
    redirectRes.headers.set('x-middleware-cache', 'no-cache')
    return redirectRes
  }
  res.headers.set('x-middleware-cache', 'no-cache')
  return res
}

export const config = {
  matcher: '/application/:path*'
}
