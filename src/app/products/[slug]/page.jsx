export default async function Page({ params }) {
  const slug = (await params).slug;
  return <div className="mt-96">My Product: {slug}</div>;
}
