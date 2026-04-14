import dayjs from 'dayjs';

import { navIcons, navLinks } from '#constants/index.js';
import { useWindowActions } from '#store/hooks';

/** @typedef {import('#types/models.js').WindowId} WindowId */

const Navbar = () => {
  const { openWindow } = useWindowActions();

  /** @param {WindowId} windowId */
  const handleOpenWindow = (windowId) => {
    openWindow(windowId);
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Swaraj's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => handleOpenWindow(/** @type {WindowId} */ (type))}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  );
};
export default Navbar;
