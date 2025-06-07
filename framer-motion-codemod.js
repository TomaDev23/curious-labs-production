const { getCollection } = require('jscodeshift');

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Remove all import statements for framer-motion
  root.find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'framer-motion')
    .remove();

  return root.toSource();
}; 