import { createContext, useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { GetBooks } from "../actions/book.action";
import { type GetBooksResponse } from "../types/books";
type BookContextType = ReturnType<typeof useBookProviderValue>;

const BookContext = createContext<BookContextType | null>(null);

const useBookProviderValue = () => {
  const [searchParams] = useSearchParams();

  const filters: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    filters[key] = value;
  }

  return useInfiniteQuery<GetBooksResponse>({
    queryKey: ["books", filters],
    queryFn: ({ pageParam = 1 }) => GetBooks({ page: pageParam, ...filters }),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    initialPageParam: 1,
  });
};

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useBookProviderValue();
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooksStore = () => {
  const context = useContext(BookContext);
  if (!context)
    throw new Error("useBookStore must be used inside BookProvider");
  return context;
};
