import { TRouteItems } from "../type/global";
import { NavLink } from "react-router-dom";
export const sidebarGenerator = (items: TRouteItems[], role: string) => {
  return items?.reduce((acc: any, item) => {
    if (item?.name && item?.path) {
      acc.push({
        key: item?.name,
        label: <NavLink to={`/${role}/${item?.path}`}>{item?.name}</NavLink>,
      });
    }
    if (item?.children) {
      acc.push({
        key: item?.name,
        label: item?.name,
        children: item?.children?.map((child) => {
          if (child?.name) {
            return {
              key: child?.name,
              label: (
                <NavLink to={`/${role}/${child?.path}`}>{child?.name}</NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);
};

export default sidebarGenerator;
