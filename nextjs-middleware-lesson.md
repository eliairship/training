# Next.js Middleware: Complete Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Setup and File Location](#setup-and-file-location)
3. [Basic Implementation](#basic-implementation)
4. [Path Matching with Config](#path-matching-with-config)
5. [Common Use Cases](#common-use-cases)
6. [Advanced Features](#advanced-features)
7. [Best Practices](#best-practices)
8. [Testing Middleware](#testing-middleware)
9. [Troubleshooting](#troubleshooting)
10. [Summary](#summary)

## Introduction

Next.js Middleware allows you to run code on the server before a request is completed. It enables you to modify the response by rewriting, redirecting, modifying request/response headers, or directly responding to requests.

### When to Use Middleware

Middleware is perfect for:
- **Authentication and authorization** - Protecting routes and API endpoints
- **Server-side redirects** - Based on user location, device, or other conditions
- **Request/response modification** - Adding headers, logging, or data transformation
- **A/B testing** - Routing users to different experiences
- **Bot protection** - Filtering malicious requests
- **CORS handling** - Managing cross-origin requests
- **Internationalization** - Locale-based routing

### Key Benefits

- Runs before routes are rendered
- Executes on the Edge Runtime for optimal performance
- Can modify requests and responses
- Supports complex routing logic

## Setup and File Location

### File Placement

Create your middleware file in the **root** of your project:

```
my-nextjs-app/
├── app/                 # or pages/
├── middleware.ts        # Place here (TypeScript)
├── middleware.js        # or here (JavaScript)
├── package.json
└── next.config.js
```

**Important**: The middleware file must be at the project root, at the same level as your `app` or `pages` directory.

### Basic File Structure

**TypeScript:**
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Your middleware logic here
  return NextResponse.next()
}

// Optional: Configure which paths the middleware runs on
export const config = {
  matcher: '/protected/:path*'
}
```

**JavaScript:**
```javascript
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Your middleware logic here
  return NextResponse.next()
}

export const config = {
  matcher: '/protected/:path*'
}
```

## Basic Implementation

### 1. Simple Redirect

Redirect all requests from `/about` to `/home`:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/about/:path*'
}
```

### 2. URL Rewriting

Rewrite requests to serve different content without changing the URL:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL('/about-2', request.url))
}

export const config = {
  matcher: '/about/:path*'
}
```

### 3. Conditional Logic

Apply different logic based on the request path:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }

  return NextResponse.next()
}
```

## Path Matching with Config

The `config.matcher` property determines which paths trigger your middleware.

### 1. Single Path
```javascript
export const config = {
  matcher: '/about/:path*'
}
```

### 2. Multiple Paths
```javascript
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*']
}
```

### 3. Exclude Common Paths
```javascript
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
```

### 4. Advanced Matching with Conditions
```javascript
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)/',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
```

## Common Use Cases

### 1. Authentication Middleware

Protect routes by checking authentication status:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}
```

### 2. API Authentication

Protect API routes with authentication:

```typescript
import { NextRequest } from 'next/server'

export const config = {
  matcher: '/api/:function*'
}

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !isValidToken(authHeader)) {
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}

function isValidToken(token: string): boolean {
  // Your token validation logic
  return token.startsWith('Bearer ')
}
```

### 3. CORS Configuration

Handle Cross-Origin Resource Sharing:

```typescript
import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['https://acme.com', 'https://my-app.org']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflight requests
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle simple requests
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*'
}
```

### 4. Request/Response Headers

Modify headers for requests and responses:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone request headers and add new ones
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware', 'hello')

  // Create response with modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set response headers
  response.headers.set('x-response-header', 'middleware-response')
  
  return response
}
```

### 5. Cookie Management

Read, set, and delete cookies:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Read cookies
  const sessionCookie = request.cookies.get('session')
  console.log('Session:', sessionCookie?.value)

  // Check if cookie exists
  const hasSession = request.cookies.has('session')
  
  // Delete a cookie
  if (request.nextUrl.pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('session')
    return response
  }

  // Set cookies
  const response = NextResponse.next()
  response.cookies.set('last-visit', new Date().toISOString())
  response.cookies.set({
    name: 'preferences',
    value: 'dark-mode',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  return response
}
```

## Advanced Features

### 1. User Agent Detection

Redirect based on device type:

```typescript
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  
  const url = request.nextUrl.clone()
  url.searchParams.set('viewport', viewport)
  
  return NextResponse.rewrite(url)
}
```

### 2. Geolocation-based Routing

Route users based on their location:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US'
  
  if (country === 'GB') {
    return NextResponse.rewrite(new URL('/uk', request.url))
  }
  
  if (country === 'DE') {
    return NextResponse.rewrite(new URL('/de', request.url))
  }

  return NextResponse.next()
}
```

### 3. A/B Testing

Implement feature flags and A/B testing:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Simple A/B test based on user ID or random assignment
  const userId = request.cookies.get('user-id')?.value
  const bucket = userId ? getBucket(userId) : Math.random() < 0.5 ? 'A' : 'B'
  
  if (bucket === 'B' && request.nextUrl.pathname === '/feature') {
    return NextResponse.rewrite(new URL('/feature-b', request.url))
  }

  const response = NextResponse.next()
  response.headers.set('x-bucket', bucket)
  
  return response
}

function getBucket(userId: string): 'A' | 'B' {
  // Consistent bucket assignment based on user ID
  return userId.charCodeAt(0) % 2 === 0 ? 'A' : 'B'
}
```

### 4. Request Proxying

Proxy requests to external services:

```typescript
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  if (request.nextUrl.pathname === '/proxy-this-path') {
    const rewriteUrl = new URL('https://api.external-service.com')
    return NextResponse.rewrite(rewriteUrl)
  }

  return NextResponse.next()
}
```

## Best Practices

### 1. Performance Optimization

- Keep middleware logic lightweight
- Avoid complex computations
- Use early returns to minimize processing
- Cache frequently accessed data

```typescript
export function middleware(request: NextRequest) {
  // Early return for static assets
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Your middleware logic here
  return NextResponse.next()
}
```

### 2. Error Handling

Always handle errors gracefully:

```typescript
export function middleware(request: NextRequest) {
  try {
    // Your middleware logic
    const result = someRiskyOperation()
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // Continue with the request
    return NextResponse.next()
  }
}
```

### 3. Security Considerations

- Validate all inputs
- Don't expose sensitive information in headers
- Use HTTPS for cookies with sensitive data
- Implement rate limiting for API endpoints

```typescript
export function middleware(request: NextRequest) {
  // Example: Basic rate limiting
  const clientIP = request.ip || request.headers.get('x-real-ip')
  
  if (isRateLimited(clientIP)) {
    return new Response('Too Many Requests', { status: 429 })
  }

  return NextResponse.next()
}
```

### 4. Environment-specific Logic

```typescript
export function middleware(request: NextRequest) {
  // Skip middleware in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // Production-only logic
  return authenticateUser(request)
}
```

## Testing Middleware

### 1. Unit Testing with Jest

```typescript
// middleware.test.ts
import { NextRequest } from 'next/server'
import { middleware } from './middleware'

describe('Middleware', () => {
  it('should redirect unauthenticated users', async () => {
    const request = new NextRequest('http://localhost:3000/dashboard')
    const response = await middleware(request)
    
    expect(response.status).toBe(307) // Redirect
    expect(response.headers.get('location')).toBe('/login?from=%2Fdashboard')
  })
})
```

### 2. Testing Path Matching

Use Next.js experimental testing utilities:

```javascript
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server'

describe('Middleware Matching', () => {
  it('should match protected paths', () => {
    expect(
      unstable_doesMiddlewareMatch({
        config,
        nextConfig,
        url: '/dashboard/settings',
      })
    ).toBe(true)
  })
})
```

### 3. Integration Testing

```typescript
// Test the complete middleware response
import { isRewrite, getRewrittenUrl } from 'next/experimental/testing/server'

const request = new NextRequest('https://nextjs.org/docs')
const response = await middleware(request)

expect(isRewrite(response)).toBe(true)
expect(getRewrittenUrl(response)).toBe('https://other-domain.com/docs')
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Middleware Not Running
**Problem**: Middleware doesn't execute for expected paths.

**Solutions**:
- Check file location (must be in project root)
- Verify `config.matcher` patterns
- Ensure patterns start with `/`
- Check for typos in file name (`middleware.ts/js`)

#### 2. Infinite Redirects
**Problem**: Middleware creates redirect loops.

**Solution**:
```typescript
export function middleware(request: NextRequest) {
  // Avoid redirecting to the same path
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next()
  }

  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

#### 3. Headers Not Being Set
**Problem**: Response headers don't appear in the browser.

**Solution**:
```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Make sure to return the response object
  response.headers.set('x-custom-header', 'value')
  return response // Don't forget this!
}
```

#### 4. Cookies Not Working
**Problem**: Cookies are not being set or read correctly.

**Solutions**:
- Check cookie path and domain settings
- Ensure secure cookies for HTTPS
- Verify cookie names and values

```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.cookies.set({
    name: 'session',
    value: 'abc123',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  })
  
  return response
}
```

#### 5. Edge Runtime Limitations
**Problem**: Using Node.js APIs that aren't available in Edge Runtime.

**Solution**: Use web-standard APIs or enable Node.js runtime (experimental):

```typescript
// next.config.js
module.exports = {
  experimental: {
    nodeMiddleware: true,
  },
}

// middleware.ts
export const config = {
  runtime: 'nodejs',
}
```

## Summary

Next.js Middleware is a powerful feature that enables server-side request processing with several key benefits:

### Key Takeaways

1. **File Location**: Place `middleware.ts/js` in your project root
2. **Path Matching**: Use `config.matcher` to target specific routes
3. **Response Types**: Return `NextResponse.next()`, `redirect()`, `rewrite()`, or direct responses
4. **Common Uses**: Authentication, CORS, headers, cookies, A/B testing
5. **Performance**: Keep logic lightweight and use early returns
6. **Testing**: Use Next.js experimental testing utilities for comprehensive testing

### Best Practices Summary

- ✅ Keep middleware logic simple and fast
- ✅ Handle errors gracefully
- ✅ Use early returns for excluded paths
- ✅ Validate all inputs for security
- ✅ Test middleware thoroughly
- ❌ Don't perform heavy computations
- ❌ Don't create redirect loops
- ❌ Don't expose sensitive information

### Next Steps

1. Start with a simple middleware implementation
2. Add path matching for specific routes
3. Implement common use cases like authentication
4. Test your middleware thoroughly
5. Monitor performance and optimize as needed

With this foundation, you're ready to implement powerful server-side logic in your Next.js applications using Middleware!