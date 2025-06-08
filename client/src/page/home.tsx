import BookCard from "../components/bookCard";
import { useBooksStore } from "../store/book.store";
import FilterBar from "../components/filterBar";
import Header from "../components/header";
import Skeleton from "../components/skeletonBookCard";
import InfiniteLoader from "../components/infiniteLoader";
export default function Home() {
  const { isLoading, data } = useBooksStore();
  const books = data?.pages.flatMap((page) => page.books);
  return (
    <>
      <Header></Header>
      <FilterBar></FilterBar>
      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 p-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 p-4">
            {books?.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
            <InfiniteLoader></InfiniteLoader>
          </div>
        </>
      )}
    </>
  );
}
