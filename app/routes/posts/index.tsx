import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";
import { useOptionalUser } from "~/utils";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as LoaderData;
  const user = useOptionalUser();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Posts</h1>
      <div className="w-full text-right">
        {user ? (
          <>
            <Link to="admin" className="mr-5 text-red-600 underline">
              Admin
            </Link>
            <Form action="/logout" method="post" className="inline-block">
              <button type="submit" className="text-red-600 underline">
                Logout
              </button>
            </Form>
          </>
        ) : (
          <>
            <Link to="/join" className="mr-5 text-red-600 underline">
              Sign up
            </Link>
            <Link to="/login" className="text-red-600 underline">
              Log In
            </Link>
          </>
        )}
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
