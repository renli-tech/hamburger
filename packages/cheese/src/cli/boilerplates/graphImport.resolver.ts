import { Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import GraphName from "./graphImport.entity";
import GraphNameService from "./graphImport.service";

@Service()
@Resolver(GraphName)
class GraphNameResolver {
  @Inject()
  graphImportService: GraphNameService;

  @Query(() => [GraphName])
  async graphImports(): Promise<GraphName[]> {
    return await this.graphImportService.graphImports();
  }
}

export default GraphNameResolver;
