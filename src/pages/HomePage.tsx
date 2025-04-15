import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import Preloader from '@/components/common/Preloader'

const PageWrapper = lazy(() => import('@/components/layouts/PageWrapper'))
const Navbar = lazy(() => import('@/components/layouts/Navbar'))
const Hero = lazy(() => import('@/components/sections/Hero'))
const FeaturedProjects = lazy(() => import('@/components/sections/FeaturedProjects'))
const Footer = lazy(() => import('@/components/layouts/Footer'))

export default function HomePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Guillaume Noblet | Humanitarian Data Researcher</title>
        <meta
          name='description'
          content='Guillaume Noblet is a Humanitarian Data Research at IMPACT Initiatives. Recently, I unpacked a new avenue I want to follow: viz & data journalism.'
        />
        <link
          rel='canonical'
          href='https://gnoblet.github.io'
        />
      </Helmet>
      <Suspense fallback={<Preloader />}>
        <PageWrapper>
          <Navbar />
          <Hero />
          <FeaturedProjects />
          <Footer />
        </PageWrapper>
      </Suspense>
    </>
  )
}
