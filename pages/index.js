import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`products/${product.id}`}>
              <a>
                <h2>{product.name}</h2>
              </a>
            </Link>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummu-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (data.length === 0) {
    return {
      notFound: true, // If no products are found, return a 404 page
    };
  }

  return {
    props: {
      products: data,
    },
    revalidate: 10, // Revalidate every 10 seconds
  };
}
export default HomePage;
