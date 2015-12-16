function isMainSection(mainSectionId) {
  'ngInject';
  return arr => arr.filter(item => item.id === mainSectionId);
}

function isNotSystemSection() {
  return arr => arr.filter(item => !item.system);
}

export { isMainSection, isNotSystemSection };
