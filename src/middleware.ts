import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/models/supabase'

export async function middleware (req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  if (req.nextUrl.pathname.startsWith('/application') && session === null) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return res
}
