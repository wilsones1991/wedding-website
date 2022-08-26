import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingSpinnerBig from '../../src/Components/LoadingSpinnerBig'

export default function Loading( {setEditRsvpGroup} ) {
    
    const router = useRouter()

      useEffect(() => {
        if (!router.isReady) return
 
        fetch(`https://wedding-website-server-360220.wl.r.appspot.com/api/api/${router.query.groupId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setEditRsvpGroup(data.invitees)
                router.push('/')
            })
      },[router.isReady])
      
        return (
            <>
                <Head>
                    <title>Kylie and Eric's Wedding</title>
                </Head>
                <div className="loading-page-container">
                    <h1>Finding your RSVP...</h1>
                    <LoadingSpinnerBig />
                </div>
                
            </>
            
      );
}