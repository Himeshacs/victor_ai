import { type ReactNode } from "react";

type ProviderComponent = React.ComponentType<{ children: ReactNode }>;

export const composeProviders = (...providers: ProviderComponent[]) => {
  return ({ children }: { children: ReactNode }) => {
    return providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, children);
  };
};
