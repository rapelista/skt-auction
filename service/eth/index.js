import { ethers } from "ethers";
import { APP_ABI, APP_ADDRESS, AUCTION_ABI } from "./data";

export const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getContract = (address, abi, sop) => {
  return new ethers.Contract(address, abi, sop);
};

export const getAuctions = async (provider) => {
  const contract = getContract(APP_ADDRESS, APP_ABI, provider);
  return await contract.get_auctions();
};

export const newAuction = async (signer, data) => {
  const { item_name, init_price, desc, image_url } = data;
  const contract = getContract(APP_ADDRESS, APP_ABI, signer);
  return await contract.open_auction(
    item_name,
    desc,
    image_url,
    ethers.utils.parseEther(init_price).toString()
  );
};

export const getDataAuction = async (address, provider) => {
  const contract = getContract(address, AUCTION_ABI, provider);
  return await contract.get_data();
};

export const finishAuction = async (address, signer) => {
  const contract = getContract(address, AUCTION_ABI, signer);
  return await contract.finish();
};

export const setBid = async (address, price, signer) => {
  const contract = getContract(address, AUCTION_ABI, signer);
  return await contract.set_bid({
    value: ethers.utils.parseEther(price),
  });
};
