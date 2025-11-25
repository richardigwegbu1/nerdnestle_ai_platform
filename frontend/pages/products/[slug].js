import axios from "axios";
import { useRouter } from "next/router";

export default function ProductPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>{product.name}</h1>
      <p style={{ marginTop: "1rem" }}>{product.description}</p>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "0.75rem 1.25rem",
            background: "#111",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  try {
    const res = await axios.get("http://localhost:8000/api/products");
    const products = res.data || [];

    const paths = products.map((p) => ({
      params: { slug: p.slug },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.error("Error loading product list:", err);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`http://localhost:8000/api/products/${params.slug}`);
    return {
      props: {
        product: res.data || null,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.error("Error loading product:", err);
    return {
      props: {
        product: null,
      },
      revalidate: 10,
    };
  }
}

