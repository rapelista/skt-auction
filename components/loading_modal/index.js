import { useData } from "../../context/index";

export default function Loading() {
  const { isLoading } = useData();
  return (
    <>
      <div
        className={`bg-black/[.50] fixed top-0 left-0 w-full h-full grid place-items-center ${
          isLoading ? "" : "invisible"
        }`}
      >
        <div id="form">
          <div className="container">
            <div className="w-72 mx-auto bg-black py-6 px-10 border-2">
              <div className="loading">
                <div className="loading-text">
                  <span className="loading-text-words">L</span>
                  <span className="loading-text-words">O</span>
                  <span className="loading-text-words">A</span>
                  <span className="loading-text-words">D</span>
                  <span className="loading-text-words">I</span>
                  <span className="loading-text-words">N</span>
                  <span className="loading-text-words">G</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
