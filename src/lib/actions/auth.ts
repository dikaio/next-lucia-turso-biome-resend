"use server"

import { lucia, validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { userTable } from "@/lib/db/schema"
import { SignInSchema, SignUpSchema } from "@/utils/types"
import { hash } from "@node-rs/argon2"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export const signUp = async (values: {
  email: string
  password: string
}) =>
{
  try
  {
    SignUpSchema.parse(values)
  } catch (error)
  {
    if (error instanceof Error)
    {
      return {
        error: error.message,
      }
    }
  }
  const hashedPassword = await hash(values.password)
  const userId = uuidv4()

  try
  {
    await db
      .insert(userTable)
      .values({
        id: userId,
        email: values.email,
        hashedPassword,
      })
      .returning({
        id: userTable.id,
        email: userTable.email,
      })

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return {
      success: true,
      data: {
        userId,
      },
    }
  } catch (error)
  {
    if (error instanceof Error)
    {
      return {
        error: error.message,
      }
    }
    return {
      error: "An unknown error occurred",
    }
  }
}

export const signIn = async (values: {
  email: string
  password: string
}) =>
{
  try
  {
    SignInSchema.parse(values)
  } catch (error)
  {
    if (error instanceof Error)
    {
      return {
        error: error.message,
      }
    }
    return {
      error: "An unknown error occurred",
    }
  }
  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.email, values.email),
  })

  if (!existingUser)
  {
    return {
      error: "User not found",
    }
  }

  if (!existingUser.hashedPassword)
  {
    return {
      error: "User not found",
    }
  }

  const isValidPassword = await hash(existingUser.hashedPassword)

  if (!isValidPassword)
  {
    return {
      error: "Incorrect username or password",
    }
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  })

  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  return {
    success: "Logged in successfully",
  }
}

export const signOut = async () =>
{
  try
  {
    const { session } = await validateRequest()

    if (!session)
    {
      return {
        error: "Unauthorized",
      }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  } catch (error: any)
  {
    return {
      error: error?.message,
    }
  }
}
