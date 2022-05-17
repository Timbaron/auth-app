import Head from 'next/head'
import Image from 'next/image'
import React, {useState} from 'react'
import styles from '../styles/Home.module.css'
import jwt from 'jsonwebtoken'
import NextNProgress from 'nextjs-progressbar'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('You are not logged in')

  async function submitHandler(e) {
    // check if user is already logged in
    // clear the local storage
    
    if (localStorage.getItem('token')) {
      setMessage('You are already logged in')
      localStorage.removeItem('token')
      return
    }
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())

    const token = res.token

    if(token){
      const json = jwt.decode(token)
      localStorage.setItem('token', token)
      if(json.admin){
        setMessage('You are logged in as admin')
      } else {
        setMessage('You are logged in as user')
      }
    }
    else{
      setMessage('Wrong credentials')
    } 
  }
  return (
    <>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={6}
        showOnShallow={true}
      />
      <Head>
        <title>Authentication</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <h2>Welcome back</h2>
          <form className={styles.form}>
            <h5>{message}</h5>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={submitHandler}>Login</button>
          </form>
        </div>
      </div>
    </>
  )
}
