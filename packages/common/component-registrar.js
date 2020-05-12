import factory from './component-factory'
class ComponentRegistrar {
  constructor ({ repoName }) {
    this.factory = factory
    this.componentDefs = []
    this.repo = {
      repoKey: repoName,
      repoName,
      componentDefs: this.componentDefs
    }
    if (!this.factory.contains(repoName)) {
      this.factory.addRepo(this.repo)
    }
  }
  register ({ type, component, options }) {
    this.componentDefs.push({ type, component, options })
  }
}

export default ComponentRegistrar
