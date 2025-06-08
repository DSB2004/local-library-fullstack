import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { AddReview, AddOrUpdateRating } from "../actions/interaction.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

const ReviewSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }).max(5),
  review: z.string().min(1, { message: "Review is required" }),
  learningReflection: z.string().optional(),
});

type ReviewFormInputs = z.infer<typeof ReviewSchema>;

export default function ReviewCard({ bookId }: { bookId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ReviewFormInputs>({
    resolver: zodResolver(ReviewSchema),
  });

  const onSubmit = async (data: ReviewFormInputs) => {
    if (data.rating && data.review) {
      await AddOrUpdateRating(bookId, String(data.rating));
      await AddReview(bookId, data.review, data.learningReflection || "");
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <button className="btn" onClick={() => dialogRef.current?.showModal()}>
        Add Review/Rating
      </button>

      <dialog ref={dialogRef} className="modal rounded-lg backdrop:bg-black/50">
        <div className="bg-white rounded-lg w-80 sm:w-96 lg:w-[500px] p-6">
          <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
          {bookId}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Rating</label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Controller
                    key={star}
                    control={control}
                    name="rating"
                    render={({ field }) => (
                      <input
                        type="radio"
                        {...field}
                        value={star}
                        className="mask mask-star-2 bg-orange-400"
                        aria-label={`${star} star`}
                        checked={field.value === star}
                        onChange={() => setValue("rating", star)}
                      />
                    )}
                  />
                ))}
              </div>
              {errors.rating && (
                <span className="text-red-500 text-sm">
                  {errors.rating.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Your Review
              </label>
              <textarea
                {...register("review")}
                className="textarea textarea-bordered w-full"
                placeholder="Write your review here..."
                rows={4}
              />
              {errors.review && (
                <span className="text-red-500 text-sm">
                  {errors.review.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Learning Reflection (Optional)
              </label>
              <textarea
                {...register("learningReflection")}
                className="textarea textarea-bordered w-full"
                placeholder="Any learning reflection..."
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="btn btn-outline btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <>Submit Review</>
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
