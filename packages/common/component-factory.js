class ComponentFactory {
  constructor () {
    this.repos = {}
  }
  getRepoNames () {
    return Object.values(this.repos).map(o => o.name)
  }
  getRepos () {
    return this.repos
  }
  /**
   * 新增一个组件仓库
   */
  addRepo ({ key, name, componentDefs }) {
    const repo = { key, name, componentDefs }
    this.repos[key] = repo
  }
  addRepos (repos) {
    repos.forEach(o => this.addRepo(o))
  }
  contains (key) {
    return !!this.repos[key]
  }
  getRepo (key) {
    return this.repos[key]
  }
  getAllComponents () {
    return Object.values(this.repos).map(o => o.componentDefs).reduce((a, b) => {
      return a.concat(b)
    })
  }
}

const factory = new ComponentFactory()
export default factory
