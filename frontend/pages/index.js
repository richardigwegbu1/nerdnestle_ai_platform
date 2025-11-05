import Link from 'next/link'

export default function Home() {
  return (
    <main style={{padding:'2rem', maxWidth:900, margin:'0 auto'}}>
      <h1>NerdNestle</h1>
      <p>Launch AI-powered storefronts and earn commissions.</p>
      <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
        <Link href="/products">View Products</Link>
        <Link href="/dashboard">Go to Dashboard</Link>
        <Link href="/create-site">Create AI Site</Link>
      </div>
    </main>
  )
}
