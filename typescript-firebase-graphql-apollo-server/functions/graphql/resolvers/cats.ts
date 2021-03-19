import { getCatsProps } from "../interfaces";
import { getCats } from "../queries/cats";

export const catsResolvers = {
  Query: {
    getCats: async (_parent: any, { name }: getCatsProps) => {
      return await getCats(name);
    }
  }
};
