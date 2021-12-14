import { ServiceEndpointDefinition } from "@apollo/gateway";
import { readdirSync } from "fs-extra";
import { join } from "path";

export const getServiceList = async (): Promise<
  ServiceEndpointDefinition[]
> => {
  const serviceList: ServiceEndpointDefinition[] = [];

  const dir = await readdirSync(join(__dirname, "../entities"));

  await new Promise((res) => {
    dir.forEach(async (v, i, arr) => {
      const service = await loadService(v);
      serviceList.push(service);

      if (i === arr.length - 1) {
        res(null);
      }
    });
  });

  return serviceList;
};

const loadService = async (
  name: string
): Promise<ServiceEndpointDefinition> => {
  const module = require(`../entities/${name}/index.ts`);

  const url: string = await module.init();

  return {
    name,
    url,
  };
};
