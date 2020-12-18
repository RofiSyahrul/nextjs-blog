import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'Rofi'
const ogImage =
  'https://avatars1.githubusercontent.com/u/44445726?s=460&u=7226c3b6d6e2d2163dd0eab652c20aaba6775755&v=4'
const siteTitle = 'Next.js Sample Website'

/**
 * @typedef {Object} LayoutProps
 * @property {boolean=} home
 * @property {string=} title
 */

/** @type {React.FC<LayoutProps>} */
const Layout = ({ children, home, title = siteTitle }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta property='og:image' content={ogImage} />
        <meta name='og:title' content={title} />
        <meta name='twitter:card' content='summary_large_image' />
        <title>{title}</title>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src='/images/profile.jpg'
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href='/'>
              <a>
                <img
                  src='/images/profile.jpg'
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href='/'>
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout
