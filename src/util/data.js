export const addOverload = node => {
  node.RouteName =
    node.Name +
    "(" +
    (node.Inputs
      ? node.Inputs.map(e => e.Name + "_" + e.Type).join("-")
      : "()") +
    ")";
  node.TempName =
    node.Name +
    " (" +
    (node.Inputs ? node.Inputs.map(e => e.Name).join(", ") : "()") +
    ")";
};
