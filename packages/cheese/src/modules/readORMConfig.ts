import { join } from "path";
import { readJson } from "fs-extra";
import { ConnectionOptions } from "typeorm";

export const getConnection = async (): Promise<ConnectionOptions> => {
  const config: ConnectionOptions = await readJson(
    join(process.cwd(), "/ormconfig.json")
  );
  if (!config) {
    throw Error("Connection Not Found");
  }
  return { ...config, name: undefined };
};

export default getConnection;
