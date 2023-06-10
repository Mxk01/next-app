import { NextPageContext } from "next"
import { useSession, signIn, signOut, getSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    console.log(session)
    return (
      <>
        <h1>{session && session.user ? `Hello ${session.user.name}`: "sign in"}</h1>
        <img src={session?.user?.image!}  className="w-10 h-10 rounded-full" alt=""/>
        <br />
       <button onClick={() => signOut()}>Sign out</button> 
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>    
    </>
  )
}


export async function getServerSideProps (ctx:NextPageContext) {
 const session = await getSession(ctx); // getSession is used so we can get the session data on the server 
 return {
  props:{
    session
  }
 }
}