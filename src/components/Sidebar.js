const renderLists = (documents, styleInput = '') => {
  return `
    
      ${documents
        .map(
          ({ id, title, isToggled, documents }) => `
          <ul class="sidebar">
            <li data-id="${id}">
              <button class="sidebar__toggle" type="button" style="${styleInput}">▶</button>
              <span class="sidebar__title" style="${styleInput}">${title}</span>
              <button class="sidebar__add" type="button" style="${styleInput}">+</button>
              <button class="sidebar__delete" type="button" style="${styleInput}">-</button>
            </li>
          
          ${
            documents.length > 0
              ? renderLists(
                  documents,
                  `display: ${isToggled ? 'none' : 'inline'};`
                )
              : ''
          }
          </ul>
          `
        )
        .join('')}
    
    `;
};

export default function Sidebar({
  $target,
  intialState,
  addList,
  showDocument,
  foldList,
  deleteList
}) {
  const $sidebar = document.createElement('aside');
  $target.appendChild($sidebar);

  this.state = intialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      $sidebar.innerHTML = renderLists(this.state);
    }
  };

  this.render();

  $sidebar.addEventListener('click', e => {
    const clicked = e.target;
    const className = clicked.className;
    const $li = clicked.closest('li');
    if ($li) {
      const id = parseInt($li.dataset.id);

      if (className === 'sidebar__add') {
        addList(id);
      } else if (className === 'sidebar__title') {
        showDocument(id);
      } else if (className === 'sidebar__toggle') {
        foldList({ rootDocuments: this.state, documentId: id });
      } else if (className === 'sidebar__delete') {
        deleteList(id);
      }
    }
  });
}
