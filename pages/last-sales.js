import { useEffect } from "react";
import { useState } from "react";
// import useSWR from "swr"; // Do not use named import if your environment does not support it

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales || []);
  const [isLoading, setIsLoading] = useState(true);

  // const { data, error } = useSWR(
  //   "https://test-4ed87-default-rtdb.firebaseio.com/s1.json"
  // );

  // useEffect(() => {
  //   if (data) {
  //     const saleObj = {
  //       // Generate a unique ID for each sale
  //       id: Math.random().toString(),
  //       username: data.username,
  //       volume: data.volume,
  //     };
  //     setSales(saleObj);
  //   }
  // }, [data]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://test-4ed87-default-rtdb.firebaseio.com/s1.json")
      .then((res) => res.json())
      .then((data) => {
        const saleObj = {
          // Generate a unique ID for each sale
          id: Math.random().toString(),
          username: data.username,
          volume: data.volume,
        };
        setSales(saleObj);
        setIsLoading(false);
      });
  }, []);

  if (!sales) {
    return <p>No sales data found.</p>;
  }

  return (
    <div>
      <h1>Last Page</h1>
      <ul>
        <li key={sales.id}>{sales.id}</li>
        <li>{sales.username}</li>
        <li>{sales.volume}</li>
      </ul>
    </div>
  );
}

export default LastSalesPage;

export async function getStaticProps() {
  const response = await fetch(
    "https://test-4ed87-default-rtdb.firebaseio.com/s1.json"
  );
  const data = await response.json();

  if (!data) {
    return {
      notFound: true, // If no data is found, return a 404 page
    };
  }
  console.log("Data fetched in getStaticProps");

  return {
    props: {
      sales: data,
    },
    revalidate: 10, // Revalidate every 10 seconds
  };
}
