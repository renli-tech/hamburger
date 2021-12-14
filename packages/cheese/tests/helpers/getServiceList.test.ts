import { getServiceList } from "../../src/helpers/getServiceList";

it("returns serviceList", () => {
  const serviceList = getServiceList();

  expect(serviceList).toStrictEqual([
    {
      name: "user",
      url: "",
    },
  ]);
});
