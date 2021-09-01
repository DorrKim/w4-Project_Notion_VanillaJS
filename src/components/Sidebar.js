import { request } from '../api.js';

const renderLists = documents => {
  return `
    <ul>
      ${documents
        .map(
          ({ id, title, documents }) => `
          <li data-id="${id}">
            <button class="toggle" type="button">▶</button>
            <span class="title">${title}</span>
            <button class="add" type="button">+</button>
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
