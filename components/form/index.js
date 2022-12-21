/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { useData } from "../../context";
import { newAuction } from "../../service/eth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../service/firebase";
import Landing from "../landing";
import { ErrorActions, LoadingActions } from "../../context/action";

export default function Form() {
  const { isConnected, signer, address, dispatch } = useData();

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

  const fileHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    dispatch({ type: LoadingActions.SET_ONLOADING });
    try {
      const imageRef = ref(storage, address + "-" + image.name);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              dispatch({ type: LoadingActions.SET_OFFLOADING });
              setImageUrl(url);
            })
            .catch(() => {
              dispatch({ type: LoadingActions.SET_OFFLOADING });
              dispatch({ type: ErrorActions.SET_ONERROR });
            });
        })
        .catch(() => {
          dispatch({ type: LoadingActions.SET_OFFLOADING });
          dispatch({ type: ErrorActions.SET_ONERROR });
        });
    } catch (error) {
      dispatch({ type: LoadingActions.SET_OFFLOADING });
      dispatch({ type: ErrorActions.SET_ONERROR });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: LoadingActions.SET_ONLOADING });

    try {
      const tx = await newAuction(signer, {
        item_name: nameRef.current.value,
        init_price: priceRef.current.value,
        desc: descRef.current.value,
        image_url: imageUrl,
      });
      tx.wait().then(() => {
        setImage(null);
        setImageUrl("");
        window.location.href = "/";
      });
    } catch (error) {
      dispatch({ type: LoadingActions.SET_OFFLOADING });
      dispatch({ type: ErrorActions.SET_ONERROR });
    }
  };

  return (
    <>
      {isConnected ? (
        <div id="form">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="yes"
                  className="w-full md:w-[50%] lg:w-full mx-auto mt-4"
                ></img>
              ) : (
                <div className="text-center lg:pt-36">
                  Upload your image first.
                </div>
              )}
              <div className="col-span-2">
                <form onSubmit={submitHandler}>
                  <label>Item Name</label>
                  <input type="text" ref={nameRef} />
                  <label>Initial Price</label>
                  <input type="number" step="any" ref={priceRef} />
                  <label>Description</label>
                  <textarea ref={descRef}></textarea>
                  <label>Image</label>
                  <input
                    type="file"
                    onChange={fileHandler}
                    className="text-white border-2 bg-white"
                  />
                  <div className="text-center my-4">
                    <button
                      className="mr-2 hover:bg-sky-500 hover:border-sky-500"
                      onClick={uploadHandler}
                    >
                      Upload Image
                    </button>
                    {imageUrl != "" ? (
                      <button
                        type="submit"
                        className="hover:bg-sky-500 hover:border-sky-500"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="disabled:cursor-no-drop"
                        disabled
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Landing />
      )}
    </>
  );
}
