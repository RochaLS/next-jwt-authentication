import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, isAuthenticated} = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password
    }

    await signIn(data)
  }


  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
      <button type="submit">Sign in</button>
    </form>
  )
}


export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
      props: {}
    }
})