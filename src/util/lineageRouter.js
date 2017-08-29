const joinRoute = arr => arr.join("/");

export function lineageToRoute(node) {
  if (node.Lineage) {
    return node.Lineage.length > 0
      ? joinRoute([...node.Lineage, node.Name])
      : node.Name;
  } else {
    return joinRoute([...node.Categories, node.Group, node.RouteName]);
  }
}

export function hierarchyIterator(ob) {
  if (ob && ob.Parent !== "Home") {
    return [ob.Parent].concat(hierarchyIterator(ob.Parent)).filter(el => el);
  } else {
    return [];
  }
}
