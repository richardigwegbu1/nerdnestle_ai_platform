import { useState } from 'react'
import axios from 'axios'

export default function CreateSite() {
  const [productName, setProductName] = useState('AI Resume Kit')
  const [niche, setNiche] = useState('Tech Jobs')
  const [tone, setTone] = useState('professional')
  const [result, setResult] = useState('')

  const generate = async () => {
    const api = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'
    const res = await axios.post(api + '/ai/generate', { product_name: productName, niche, tone })
    setResult(JSON.stringify(res.data, null, 2))
  }

  return (
    <main style={{padding:'2rem', maxWidth:900, margin:'0 auto'}}>
      <h1>Create AI Storefront Copy</h1>
      <div style={{display:'grid', gap:'0.5rem', maxWidth:600}}>
        <label>Product Name</label>
        <input value={productName} onChange={e=>setProductName(e.target.value)} />

        <label>Niche</label>
        <input value={niche} onChange={e=>setNiche(e.target.value)} />

        <label>Tone</label>
        <input value={tone} onChange={e=>setTone(e.target.value)} />
      </div>

      <button onClick={generate} style={{marginTop:'1rem'}}>Generate</button>

      <pre style={{whiteSpace:'pre-wrap', marginTop:'1rem', background:'#fafafa', padding:'1rem', borderRadius:8}}>{'{'}result{'}'}</pre>
    </main>
  )
}
