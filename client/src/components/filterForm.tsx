
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FilterInputs = {
  genre: string;
  rating: string;
  author: string;
  name: string;
};

export default function FilterForm() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FilterInputs>();

  const onSubmit = (data: FilterInputs) => {
    const currentParams = new URLSearchParams(location.search);
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });
    navigate({ search: currentParams.toString() });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="menu bg-base-200 text-base-content min-h-full w-80 sm:w-96 lg:w-[400px] p-6 space-y-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold">Add Filters</h2>
      <div className="form-control">
        <label className="label" htmlFor="genre">
          <span className="label-text font-medium">Genre</span>
        </label>
        <select
          id="genre"
          defaultValue=""
          className="select select-bordered"
          {...register("genre")}
        >
          <option disabled value="">
            Pick a Genre
          </option>
          <option value="FICTION">Fiction</option>
          <option value="NONFICTION">Nonfiction</option>
          <option value="MYSTERY">Mystery</option>
          <option value="SCIFI">Sci-Fi</option>
          <option value="FANTASY">Fantasy</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="HISTORY">History</option>
          <option value="ROMANCE">Romance</option>
          <option value="THRILLER">Thriller</option>
          <option value="HORROR">Horror</option>
          <option value="SELFHELP">Self Help</option>
          <option value="PHILOSOPHY">Philosophy</option>
          <option value="POETRY">Poetry</option>
          <option value="BUSINESS">Business</option>
          <option value="TRAVEL">Travel</option>
          <option value="HEALTH">Health</option>
          <option value="SCIENCE">Science</option>
          <option value="RELIGION">Religion</option>
          <option value="CHILDREN">Children</option>
          <option value="EDUCATION">Education</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Rating</span>
        </label>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              value={star}
              {...register("rating")}
              name="rating"
              className="mask mask-star bg-orange-400"
              aria-label={`${star} star`}
            />
          ))}
        </div>
      </div>
      <div className="form-control">
        <label className="label" htmlFor="author">
          <span className="label-text font-medium">Author Name</span>
        </label>
        <input
          type="text"
          id="author"
          placeholder="Enter author's name"
          className="input input-bordered"
          {...register("author")}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text font-medium">Book Name</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter book name"
          className="input input-bordered"
          {...register("name")}
        />
      </div>
      <div className="form-control pt-2">
        <button type="submit" className="btn btn-primary w-full">
          Apply Filters
        </button>
      </div>
    </form>
  );
}
