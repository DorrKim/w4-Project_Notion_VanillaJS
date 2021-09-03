import { request } from '../api.js';

const renderLists = (documents, depth = 0) => {
  depth++;
  return `
    <ul class="sidebar">
      ${documents
        .map(
          ({ id, title, isToggled, documents }) => `
          <li data-id="${id}" data-depth="${depth}" style="${
            isToggled ? 'none' : 'block'
          }">
            <button class="sidebar__toggle" type="button">▶</button>
            <span class="sidebar__title">${title}</span>
            <button class="sidebar__add" type="button">+</button>
            <button class="sidebar__delete" type="button">-</button>
            ${documents.length > 0 ? renderLists(documents, depth) : ''}
          </li>
          `
        )
        .join('')}
    </ul>
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
      const depth = parseInt($li.dataset.depth);

      if (className === 'sidebar__add') {
        addList(id);
      } else if (className === 'sidebar__title') {
        showDocument(id);
      } else if (className === 'sidebar__toggle') {
        console.log(this.state);
        foldList($li, depth);
      } else if (className === 'sidebar__delete') {
        deleteList(id);
      }
    }
  });
}
