import { Lucia } from "lucia"
import type { Session, User } from "lucia"
import { cookies } from "next/headers"
import { cache } from "react"
import { adapter } from "./adapter"

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) =>
  {
    return {
      email: attributes.email,
    }
  },
})

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > =>
  {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

    if (!sessionId)
    {
      return {
        user: null,
        session: null,
      }
    }

    const result = await lucia.validateSession(sessionId)
    try
    {
      if (result.session?.fresh)
      {
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        )
      }
      if (!result.session)
      {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        )
      }
    } catch { }
    return result
  },
)


// IMPORTANT!
declare module "lucia" {
  interface Register
  {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes
{
  email: string
}
