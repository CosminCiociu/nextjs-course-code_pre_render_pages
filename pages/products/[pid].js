import { Fragment } from "react/jsx-runtime";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>; // or a custom loading component
  }

  return (
    <Fragment>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummu-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.map((product) => product.id);

  const params = ids.map((id) => ({
    params: { pid: id.toString() }, // Convert to string for dynamic routing
  }));

  return {
    paths: params,
    fallback: true, // or 'blocking' if you want to wait for the data to be fetched
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  // The data in your JSON file is likely an array of product objects.
  const product = data.find((product) => product.id === Number(productId));

  if (!product) {
    return {
      notFound: true, // If the product is not found, return a 404 page
    };
  }

  return {
    props: {
      product: product || null,
    },
  };
}

export default ProductDetailPage;
