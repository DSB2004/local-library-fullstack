import  { useCallback, useEffect, useMemo, useState } from "react";
import type { BookType } from "../types/books";
import { BorrowBook, ReturnBook } from "../actions/borrow.action";
import { useUserStore } from "../store/user.store";
import ReviewCard from "./reviewCard";
import { LoaderCircle } from "lucide-react";
import { useToast } from "../provider/toast.provider";

export default function BookCard(props: BookType) {
  const { name, author, genre, avgRating, description, stats, id } = props;

  const { borrowCount, reviewCount, ratingCount } = stats;
  const [currentState, setState] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { data, refetch } = useUserStore();
  const { showToast } = useToast();
  const WasBorrowedBefore = useMemo(() => {
    if (!data?.user) return false;
    return (
      data.user.borrows.find(
        (ele) => ele.bookId === id && ele.returnDate !== null
      ) != null
    );
  }, [data?.user, id]);

  const isBorrowed = useMemo(() => {
    if (!data?.user) return null;
    return (
      data.user.borrows.find(
        (ele) => ele.bookId === id && ele.returnDate === null
      ) || null
    );
  }, [data?.user, id]);

  const handleBorrow = useCallback(async () => {
    try {
      setLoading(true);
      if (isBorrowed !== null) {
        const { message } = await ReturnBook(isBorrowed.id);
        showToast(message, "info");
      } else if (WasBorrowedBefore) {
        const { message } = await BorrowBook(id);
        showToast(message, "info");
      } else {
        const { message } = await BorrowBook(id);
        showToast(message, "info");
      }
      await refetch();
    } catch (err: any) {
      const message = err.message;
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }, [id, WasBorrowedBefore, isBorrowed]);

  useEffect(() => {
    if (isBorrowed !== null) {
      setState("Return Book");
    } else if (WasBorrowedBefore) {
      setState("Borror Again");
    } else {
      setState("Borrow Book");
    }
  }, [WasBorrowedBefore, isBorrowed, props]);
  return (
    <div className="card w-full bg-base-100 p-4 rounded shadow">
      <div className="card-body ">
        <h2 className="card-title text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-500 italic">by {author}</p>

        <p className="text-sm font-medium text-primary">Genre: {genre}</p>

        <div className="text-sm">
          {id}
          <p className="flex items-center gap-2">
            <span className="font-medium">Rating:</span>
            <div className="rating rating-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  type="radio"
                  name={`rating-${props.name}`}
                  className="mask mask-star bg-yellow-400"
                  checked={i <= Math.round(avgRating)}
                  readOnly
                />
              ))}
            </div>
            <span className="text-gray-500">({avgRating.toFixed(1)})</span>
          </p>

          <p className="mt-1 text-gray-600">{description}</p>
        </div>

        <div className="stats stats-vertical lg:stats-horizontal  mt-2 text-sm">
          <div className="stat">
            <div className="stat-title">Borrowed</div>
            <div className="stat-value !font-medium">{borrowCount}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Reviews</div>
            <div className="stat-value !font-medium">{reviewCount}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Ratings</div>
            <div className="stat-value !font-medium">{ratingCount}</div>
          </div>
        </div>

        <div className="card-actions justify-end pt-4 flex gap-2">
          <ReviewCard bookId={id}></ReviewCard>
          <button
            className={`btn btn-primary ${isLoading ? "opacity-50" : ""}`}
            onClick={() => handleBorrow()}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>{currentState}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
