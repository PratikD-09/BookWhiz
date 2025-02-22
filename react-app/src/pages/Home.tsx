import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeaturedBooks from '../components/FeaturedBooks'
import Hero from '../components/Hero'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <FeaturedBooks/>
        <Footer/>
    </div>
  )
}

export default Home
