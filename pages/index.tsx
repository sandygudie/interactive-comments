import Head from "next/head";
import { Comment } from "../types/index";
import { useAppContext } from "../context/index";
import MessageBox from "../components/MessageBox";
import Comments from "../components/Comments";

export default function Home() {
  const { comments } = useAppContext();

  return (
    <div className="p-2 lg:w-1/2 m-auto mt-4 md:mt-16">
      <Head>
        <title>Interactive Comment App</title>
        <meta name="description" content="Interactive Comment App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {comments.map((item: Comment) => (
        <Comments comment={item} key={item.id} />
      ))}
      <MessageBox />
    </div>
  );
}
