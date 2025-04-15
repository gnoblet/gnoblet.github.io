import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import Preloader from '@/components/common/Preloader'

const PageWrapper = lazy(() => import('@/components/layouts/PageWrapper'))
const Navbar = lazy(() => import('@/components/layouts/Navbar'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Footer = lazy(() => import('@/components/layouts/Footer'))

export default function AboutPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Projects by Guillaume Noblet | Humanitarian Data Researcher</title>
        <meta
          name='description'
          content="Explore Guillaume Noblet's projects!"
        />
        <link
          rel='canonical'
          href='https://gnoblet.github.io/projects'
        />
      </Helmet>
      <Suspense fallback={<Preloader />}>
        <PageWrapper>
          <Navbar />
          <Projects />
          <Footer />
        </PageWrapper>
      </Suspense>
    </>
  )
}
