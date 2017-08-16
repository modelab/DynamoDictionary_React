const joinRoute = arr => arr.join("/");

export default function lineageToRoute(node) {
  if (node.Lineage) {
    return node.Lineage.length > 0
      ? joinRoute([...node.Lineage, node.Name])
      : node.Name;
  } else {
    return joinRoute([...node.Categories, node.Group, node.RouteName]);
  }
}
