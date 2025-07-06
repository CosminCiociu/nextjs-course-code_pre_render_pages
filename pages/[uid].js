function UserIdPage(props) {
  const loadedUser = {
    id: props.id,
  };

  if (!loadedUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{loadedUser.id}</h1>
    </div>
  );
}

export default UserIdPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: `userid-${userId}`,
    },
  };
}
