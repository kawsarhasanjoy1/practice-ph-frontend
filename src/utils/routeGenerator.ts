import { TRoute, TRouteItems } from "../type/global";

const routeGenerator = (items: TRouteItems[]) => {
  return items?.reduce((acc: TRoute[], item) => {
    if (item?.path && item?.element) {
      acc.push({ path: item?.path, element: item?.element });
    }
    if (item?.children) {
      item?.children?.forEach((child) => {
        acc.push({ path: child?.path as string, element: child.element });
      });
    }
    return acc;
  }, []);
};

export default routeGenerator;
