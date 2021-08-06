import {ChakraProvider} from "@chakra-ui/react";
import {PageShell} from "../components/Layout/Pageshell"
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import {ApolloProviderWrapper} from "../utils/apolloClient";
import {useRouter} from "next/router";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
 return(
   <ChakraProvider>
     <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API} navigate={(to) =>router.push(to)}>
      {
        publicPages.includes(router.pathname) ? (
          <Component {...pageProps}/>
        ) : (
          <>
          <SignedIn>
            <ApolloProviderWrapper>
              <PageShell>
                <Component {...pageProps}/>
              </PageShell>
            </ApolloProviderWrapper>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn/>
          </SignedOut>
          </>
        )
      }
     </ClerkProvider>
   </ChakraProvider>
 )
}

export default MyApp
