import React from 'react'
import Header from '../components/header/header'
import AchievementsBlock from '../components/volunteer_block/volunteer_block'
import Footer from '../components/footer/footer'
import HomeBanner from '../components/homeBanner/homeBanner'

function Home() {
  return (
    <div>
      <Header />
      <main>
      <HomeBanner />
      <AchievementsBlock />
      </main>
      <Footer />
    </div>
  )
}

export default Home
