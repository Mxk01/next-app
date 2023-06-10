import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID as string,
        clientSecret: process.env.TWITTER_CLIENT_SECRET as string
      })
    
  ],
}

export default NextAuth(authOptions)