
import { useUserStore } from "../store/user.store";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useUserStore();
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className=" text-xl">Local Library Portal</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            {isLoading || isFetching ? (
              <>
                <div className="w-10 h-10 skeleton rounded-full"></div>
              </>
            ) : (
              <>
                {data === null ? (
                  <>
                    <Link to="/login" className="btn btn-neutral">
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <>
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-5  p-5 shadow-lg"
                      >
                        <p className="text-lg font-medium">
                          {data?.user.name}{" "}
                        </p>
                        <p className="text-sm font-medium opacity-35">
                          {data?.user.email}{" "}
                        </p>

                        <div
                          className="btn btn-error mt-5 text-white "
                          onClick={() => {
                            localStorage.removeItem("AccessToken");
                            navigate("/login");
                          }}
                        >
                          Logout{" "}
                        </div>
                      </ul>
                    </>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
