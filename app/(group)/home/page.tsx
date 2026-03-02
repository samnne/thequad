import React from 'react'

const Home = () => {
  return (
    <main className='flex flex-col'>
      <section className='w-full h-1/2 drop-shadow-2xl drop-shadow-black/50'>Today's Listings</section>
      <section className='h-1/2 w-full drop-shadow-2xl drop-shadow-black/50'>
        <div >
          Messages
        </div>
        <div>
          Create a Listing
        </div>
      </section>
    </main>
  )
}

export default Home