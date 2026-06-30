import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Audit from './pages/Audit'
import Services from './pages/Services'
import Proof from './pages/Proof'
import About from './pages/About'
import Book from './pages/Book'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/services" element={<Services />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
        </Route>
      </Routes>
    </>
  )
}
