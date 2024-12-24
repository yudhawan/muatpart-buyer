async function AlbumId({ params }) {
  const id = (await params).id;
  return <div>My Post: {id}</div>;
}

export default AlbumId;
