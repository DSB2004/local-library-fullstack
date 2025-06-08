

export default function Skeleton() {
  return (
    <div className="card w-full bg-base-100 p-4 rounded shadow animate-pulse">
      <div className="card-body">
        <div className="w-3/4 h-6 skeleton rounded mb-4"></div>

        <div className="w-1/4 h-4 skeleton rounded mb-2"></div>

        <div className="w-1/2 h-4 skeleton rounded mb-4"></div>

        <div className="w-3/4 h-4 skeleton rounded mb-4"></div>

        <div className="w-full h-16 skeleton rounded mb-4"></div>

        <div className="stats stats-vertical lg:stats-horizontal mt-2 text-sm">
          <div className="stat">
            <div className="w-1/3 h-4 skeleton rounded mb-2"></div>
          </div>
          <div className="stat">
            <div className="w-1/3 h-4 skeleton rounded mb-2"></div>
          </div>
          <div className="stat">
            <div className="w-1/3 h-4 skeleton rounded mb-2"></div>
          </div>
        </div>

        <div className="card-actions justify-end pt-4 flex gap-2">
          <div className="w-24 h-8 skeleton rounded"></div>{" "}
          <div className="w-24 h-8 skeleton rounded"></div>{" "}
        </div>
      </div>
    </div>
  );
}
