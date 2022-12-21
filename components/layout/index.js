import Navbar from "../navbar";
import Error from "../error_modal";
import Loading from "../loading_modal";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Error />
      <Loading />
    </>
  );
}
