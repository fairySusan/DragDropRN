export function deepTraverseById (root, id) {
  let result
  if (!root.length) {
    return undefined
  }

  result = root.find((item) => (item.name === id))
  if (!result) {
    for (let i=0; i< root.length; i++) {
      if (root[i].children && root[i].children.length > 0) {
        result = deepTraverseById(root[i].children, id)
      }
    }
  }
  return result
}