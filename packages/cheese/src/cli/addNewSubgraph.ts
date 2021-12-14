import inquirer from "inquirer";
import { mkdir, readdir, readFile, writeFile } from "fs-extra";
import { Logger } from "../modules/Logger";
import { ENTITY_DIR } from "../config";

Logger.info("Create a new Graph");

// Create files in the graph directory
const createFiles = (graphName: string, list: string[]) => {
  list.forEach((item) => {
    const fileName = item === "index" ? "index.ts" : `${graphName}.${item}.ts`;

    Logger.info(`Creating file ${fileName}`);

    readdir(`./src/cli/boilerplates`).then((files) => {
      // create files
      files.forEach(async (file) => {
        if (file.includes(item)) {
          readdir(`./src/${ENTITY_DIR}/${graphName}`).then((files) => {
            // check if file doesnt already exists
            if (!files.includes(fileName)) {
              readFile(`./src/cli/boilerplates/${file}`, "utf8").then(
                (fileContent) => {
                  let newFileContent = "";
                  newFileContent = fileContent.replace(
                    new RegExp(`(?:GraphName)+`, "g"),
                    graphName.charAt(0).toUpperCase() + graphName.slice(1)
                  );
                  newFileContent = newFileContent.replace(
                    new RegExp(`(?:graphImport)+`, "g"),
                    graphName
                  );
                  writeFile(
                    `./src/${ENTITY_DIR}/${graphName}/${fileName}`,
                    newFileContent,
                    "utf8"
                  ).then(() => {
                    Logger.success(`File ${fileName} created`);
                  });
                }
              );
            }
          });
        }
      });
    });
  });
};

// Get name of Graph;
inquirer
  .prompt([
    {
      name: "graphName",
      type: "input",
      message: "What is the name of the Graph?",
    },
    {
      name: "filesList",
      message: "What files do you want to add to the Graph?",
      type: "checkbox",
      choices: [
        "Entity file",
        "Reference file",
        "Service file",
        "Resolver file",
        "Index file",
      ],
      default: [
        "Entity file",
        "Reference file",
        "Service file",
        "Resolver file",
        "Index file",
      ],
    },
  ])
  .then((answers) => {
    const name = answers.graphName;
    const filesList: string[] = answers.filesList;

    // create the directory;
    mkdir(`./src/${ENTITY_DIR}/${name}`)
      .then(() => {
        createFiles(
          name,
          filesList.map((item) => item.toLowerCase().split(" ")[0])
        );
      })
      .catch((err) => {
        Logger.error(err);
      });
  });
