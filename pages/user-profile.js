function UserProfilePage(props) {
  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Welcome, {props.username}!</p>
    </div>
  );
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "JohnDoe", // Example static data
    },
  };
}
