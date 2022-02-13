import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from '../components/header'
import Image from 'next/image'
import Dashboard from '../components/dashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='flex flex-row justify-center py-6'>
        <Image
          priority
          src="/images/waves-logo.png"
          className={utilStyles.borderCircle}
          height={108}
          width={108}
          alt={'Waves'}
        />
      </div>
      <Dashboard></Dashboard>
    </>
  )
}