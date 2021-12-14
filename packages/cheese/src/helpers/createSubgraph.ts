import { printSubgraphSchema } from "@apollo/subgraph";
import { appendFile, readFile, writeFile } from "fs-extra";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import { usedPort } from "../modules/listen";

export const createSubgraph = async (
  name: string,
  schema: GraphQLSchema
): Promise<void> => {
  name = name.toLowerCase();
  await writeFile(
    join(`src/subgraphs/${name}.graphql`),
    printSubgraphSchema(schema)
  );

  rewriteSupergraph(name);
};

const rewriteSupergraph = async (name: string): Promise<void> => {
  name = name.toLowerCase();
  const template = `
    ${name}:
        routing_url: http://localhost:${
          usedPort.find((v) => v.name === name)?.port
        }/${name}
        schema:
            file: src/subgraphs/${name}.graphql`;

  let content = (await readFile(join("supergraph-config.yaml"))).toString();

  if (content.length === 0) {
    const newContent = `#\nsubgraphs:`;
    await writeFile(join("supergraph-config.yaml"), newContent);

    content = newContent;
  }

  const firstLine = content.split("\n")[0];

  if (firstLine.split(" ").slice(1).includes(name.toUpperCase())) {
    return;
  }

  await writeFile(
    join("supergraph-config.yaml"),
    firstLine.replace("\r", "") +
      " " +
      name.toUpperCase() +
      "\n" +
      content.split("\n").slice(1).join("\n")
  );
  await appendFile(join("supergraph-config.yaml"), template);
};
