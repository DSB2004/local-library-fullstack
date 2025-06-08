import { useEffect } from "react";
import { useBooksStore } from "../store/book.store";
import { useInView } from "react-intersection-observer";
import Skeleton from "./skeletonBookCard";
export default function InfiniteLoader() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useBooksStore();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  return <div ref={ref}>{isFetchingNextPage ? <Skeleton /> : <></>}</div>;
}
