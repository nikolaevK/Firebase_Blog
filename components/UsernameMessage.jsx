export default function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className="pb-4 m-auto mt-4 text-blue-700">Checking...</p>;
  } else if (isValid) {
    return (
      <p className="text-green-600 pb-4 m-auto mt-4">
        {username} is available!
      </p>
    );
  } else if (!isValid) {
    return (
      <p className="text-red-500 pb-4 m-auto mt-4">That username is taken!</p>
    );
  } else {
    return <p></p>;
  }
}
