import { IconExclamationMark } from "@tabler/icons";
import { ErrorActions } from "../../context/action";
import { useData } from "../../context/index";

export default function Error() {
  const { isError, dispatch } = useData();
  return (
    <>
      <div
        className={`bg-black/[.50] fixed top-0 left-0 w-full h-full grid place-items-center ${
          isError ? "" : "invisible"
        }`}
      >
        <div id="form">
          <div className="container">
            <div className="mx-auto bg-black py-6 px-10 border-2 text-center">
              <div className="mx-auto">
                <IconExclamationMark className="inline-block w-12 h-12 bg-red-500 rounded-full mr-4" />
                Error! Transaction failed, please try again or refresh.
              </div>
              <button
                className="ml-2 hover:bg-red-500 hover:border-red-500"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </button>
              <button
                className="ml-2 hover:bg-green-500 hover:border-green-500"
                onClick={() => {
                  dispatch({ type: ErrorActions.SET_OFFERROR });
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
