import {SessionProvider} from 'next-auth/react'
import { ComponentType } from 'react'


type AppProps = {
  // type for component 
  Component:ComponentType,
  // type for page props 
  pageProps:{
    // [a:b] is an index signature , it can be helpful for example when we want to receive props of a certain type
    session:any,
    [key:string]:any  // session has any type other properties have any type aswell
  }
}
export default function App({ Component, pageProps}:AppProps) {
  let {session,...restProps} = pageProps
  return <SessionProvider session={session}>
 
   <Component {...restProps}/>
  </SessionProvider>
}
