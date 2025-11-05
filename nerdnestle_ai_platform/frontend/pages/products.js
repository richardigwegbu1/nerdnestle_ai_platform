import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'
    axios.get(api + '/products').then(res => setItems(res.data)).catch(() => setItems([]))
  }, [])

  return (
    <main style={{padding:'2rem', maxWidth:900, margin:'0 auto'}}>
      <h1>Products</h1>
      <ul>
        {items.map(p => (
          <li key={p.id} style={{margin:'1rem 0', padding:'1rem', border:'1px solid #eee', borderRadius:8}}>
            <h3>{p.title} — ${'{'}p.price{'}'} <small>({'{'}p.commission_pct{'}'}% commission)</small></h3>
            <p>{'{'}p.description{'}'}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
