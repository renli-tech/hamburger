import { loadResolvers } from "../src/loadResolvers";

it("correctly loads resolvers", () => {
  const resolvers = loadResolvers();

  expect(resolvers).toBeInstanceOf(Array);
});
