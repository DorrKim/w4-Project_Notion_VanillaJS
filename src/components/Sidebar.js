import { request } from '../api.js';

const renderLists = documents => {
  return `
    <ul class="sidebar">
      ${documents
        .map(
          ({ id, title, documents }) => `
          <li data-id="${id}">
            <button class="sidebar__toggle" type="button">▶</button>
            <span class="sidebar__title">${title}</span>
            <button class="sidebar__add" type="button">+</button>
            ${documents.length ? renderLists(documents) : ''}
          </li>
          `
        )
        .join('')}
    </ul>
    `;
};

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement('aside');
  $target.appendChild($sidebar);

  this.render = async () => {
    const documents = await request('/documents/');
    $sidebar.innerHTML = renderLists(documents);
  };

  this.render();
}
