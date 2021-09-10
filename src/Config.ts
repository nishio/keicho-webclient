import { getGlobal, setGlobal } from "reactn";
import { localDB } from "./localDB";

export const defaultConfig = {
  robo_icon: "[/nishio/kei.icon]",
  human_icon: "[/nishio/human.icon]",
  project_name: "nishio",
};

const load = () => {
  return localDB.config
    .get(1)
    .then((config) => {
      if (config === undefined) {
        return defaultConfig;
      }
      return { ...defaultConfig, ...JSON.parse(config.json) };
    })
    .then((config) => {
      setGlobal({ config });
    });
};

const save = () => {
  const json = JSON.stringify(getGlobal().config);
  localDB.config.put({ json }, 1);
};

const Config = { load, save };
export default Config;
