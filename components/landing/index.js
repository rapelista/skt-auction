import { IconExternalLink } from "@tabler/icons";
import { useData } from "../../context";

export default function Landing() {
  const { isHasWallet } = useData();

  return (
    <>
      <div className="text-center">
        {isHasWallet ? (
          <>
            {"Please connect to "}
            <span className="text-yellow-400">MetaMask</span>
            {"!"}
          </>
        ) : (
          <>
            {"You haven't installed a wallet yet!"}
            <br />
            {"Please install it first, we recommend "}{" "}
            <a
              href="https://metamask.io/"
              target="_blank"
              className="text-yellow-400"
              rel="noreferrer"
            >
              MetaMask <IconExternalLink className="inline" />
            </a>
          </>
        )}
      </div>
    </>
  );
}
