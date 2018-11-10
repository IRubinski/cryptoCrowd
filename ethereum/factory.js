import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x4BD6ccbDc17593b7e576e04aFCAC597a1f1CB861"
);

export default instance;
