export const PUSH_ROUTE = "PUSH_ROUTE";

export const pushRoute = (route, iteration, currentRoute) => {
  // const new_route =
  //   currentRoute === route
  //     ? `${route.split("/").slice(0, iteration + 1).join("/")}`
  //     : route;
  // hashHistory.push(new_route);
};

export const updateRoute = data => {
  return { type: PUSH_ROUTE, data };
};
