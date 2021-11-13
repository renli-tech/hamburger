import { Service } from "typedi";
import GraphName from "./graphImport.entity";

@Service()
class GraphNameService {
  async graphImports(): Promise<GraphName[]> {
    return await GraphName.find({});
  }
}

export default GraphNameService;
