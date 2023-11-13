import React from 'react'
import Header from '../components/header/header'
import AchievementsBlock from '../components/achievements_block/achievements_block'
import Footer from '../components/footer/footer'
import HomeBanner from '../components/homeBanner/homeBanner'

function Home() {
  return (
    <div>
      <Header />
      <HomeBanner />
      <AchievementsBlock />
      <Footer />
    </div>
  )
}

export default Home
