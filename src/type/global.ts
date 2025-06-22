import { ReactNode } from "react";

export type TRouteItems = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRouteItems[];
};
export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TQueryValue = { name: string; value: string };