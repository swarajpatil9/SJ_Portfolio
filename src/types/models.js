// @ts-check

/**
 * Shared JSDoc type models for app state, config, and content.
 */

/**
 * @typedef {import('#constants/index.js').WindowId} WindowId
 */

/**
 * @typedef {'folder'|'file'} LocationKind
 */

/**
 * @typedef {'txt'|'img'|'url'|'fig'|'pdf'} LocationFileType
 */

/**
 * @typedef {Object} WindowState
 * @property {boolean} isOpen
 * @property {number} zIndex
 * @property {LocationNode | null} data
 * @property {boolean} isMaximized
 * @property {boolean} isMinimized
 */

/**
 * @typedef {Record<WindowId, WindowState>} WindowConfig
 */

/**
 * @typedef {Object} DockApp
 * @property {WindowId | 'trash'} id
 * @property {string} name
 * @property {string} icon
 * @property {boolean} canOpen
 */

/**
 * @typedef {Object} BlogPost
 * @property {number} id
 * @property {string} date
 * @property {string} title
 * @property {string} image
 * @property {string} link
 */

/**
 * @typedef {Object} BlogArticleSection
 * @property {string} heading
 * @property {string} content
 * @property {string} content2
 */

/**
 * @typedef {Object} BlogArticleData
 * @property {string} title
 * @property {string} date
 * @property {string} author
 * @property {string} readTime
 * @property {BlogArticleSection[]} sections
 */

/**
 * @typedef {Object} AppRoutes
 * @property {'/'} HOME
 * @property {'/blog/:slug'} BLOG_ARTICLE
 */

/**
 * @typedef {Object} AppEnv
 * @property {string} resumeFile
 * @property {string} pdfWorkerSrc
 */

/**
 * @typedef {Object} LocationNode
 * @property {number} id
 * @property {string} name
 * @property {string} icon
 * @property {LocationKind} kind
 * @property {LocationFileType=} fileType
 * @property {string=} href
 * @property {string=} position
 * @property {string=} windowPosition
 * @property {string=} imageUrl
 * @property {string=} image
 * @property {string=} subtitle
 * @property {string=} type
 * @property {LocationNode[]=} children
 * @property {string[]=} description
 */

/**
 * @typedef {Object} WindowActions
 * @property {(windowKey: WindowId | null) => void} setPreviewWindow
 * @property {(windowKey: WindowId, data?: LocationNode | null) => void} openWindow
 * @property {(windowKey: WindowId) => void} closeWindow
 * @property {(windowKey: WindowId) => void} minimizeWindow
 * @property {(windowKey: WindowId) => void} unminimizeWindow
 * @property {(windowKey: WindowId) => void} maximizeWindow
 * @property {(windowKey: WindowId) => void} focusWindow
 */

/**
 * @typedef {Object} WindowStoreState
 * @property {WindowConfig} windows
 * @property {number} nextZIndex
 * @property {WindowId | null} previewWindow
 */

/**
 * @typedef {WindowStoreState & WindowActions} WindowStore
 */

/**
 * @typedef {Object} LocationStore
 * @property {LocationNode | null} activeLocation
 * @property {(location?: LocationNode | null) => void} setActiveLocation
 * @property {() => void} resetActiveLocation
 */

export {};
