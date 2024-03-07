import { NextMiddlewareWithAuth, NextRequestWithAuth } from 'next-auth/middleware'

import type { NextFetchEvent } from 'next/server'

export default function apiMiddleWare(middleware: NextMiddlewareWithAuth) {
    return async (request: NextRequestWithAuth, event: NextFetchEvent) => {
        
        console.log("hello this is a middleware")
        // if (!request?.nextauth?.token?.emailVerified) {
        //     const url = new URL(`/verify-email/${request?.nextauth?.token?.email}`, request.url);
        //     return Response.redirect(url)
        // }

        return middleware(request, event);
    }
}

export const config = {
    matcher: '/api/*'
  }