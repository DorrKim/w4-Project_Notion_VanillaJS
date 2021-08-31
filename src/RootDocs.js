// import { docsTreeToArray } from "./tool.js"
export default function RootDocs({ $target, initialState, onDocsClick }) {
  const $rootDocs = document.createElement('div')
  $target.appendChild($rootDocs)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $rootDocs.innerHTML = `
    <ul>
      ${this.state.map(doc => `
        <li data-id="${doc.id}">${doc.title}</li>
      `).join('')}
    </ul>
    `
  }

  this.render()

  $rootDocs.addEventListener('click', (e) => {
    const $li = e.target.closest('li')

    if ($li) {
      const { id } = $li.dataset

      onDocsClick(id)
    }

  })

}
