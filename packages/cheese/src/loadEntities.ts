/* eslint-disable @typescript-eslint/ban-types */
import * as glob from "glob";

export type Entities = Array<Function> | Array<string>;

export function loadEntities(): Entities {
  const filePaths = glob.sync(__dirname + "/entity/**/*.{js,ts}");
  const modules: { entities: Function[]; default: Function }[] =
    filePaths.map(require);
  return modules
    .flatMap((module) => {
      const entities = [];
      if (module.default) entities.push(module.default);
      return entities;
    })
    .filter(Boolean) as Entities;
}
