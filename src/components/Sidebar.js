const renderLists = (documents, display = 'inline') => {
  return `
    
      ${documents
        .map(
          ({ id, title, isToggled, documents }) => `
          <ul class="sidebar">
            <li data-id="${id}">
              <button class="sidebar__toggle" type="button" style="${display}">▶</button>
              <span class="sidebar__title" style="${display}">${title}</span>
              <button class="sidebar__add" type="button" style="${display}">+</button>
              <button class="sidebar__delete" type="button" style="${display}">-</button>
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
  createList,
  showDocument,
  toggleList,
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
    $sidebar.innerHTML = renderLists(this.state);
  };

  this.render();

  $sidebar.addEventListener('click', e => {
    const target = e.target;
    const className = target.className;
    const $li = target.closest('li');
    if ($li) {
      const documentId = parseInt($li.dataset.id);

      if (className === 'sidebar__add') {
        createList(documentId);
      } else if (className === 'sidebar__title') {
        showDocument(documentId);
      } else if (className === 'sidebar__toggle') {
        toggleList({ rootDocuments: this.state, documentId });
      } else if (className === 'sidebar__delete') {
        deleteList(documentId);
      }
    }
  });
}
