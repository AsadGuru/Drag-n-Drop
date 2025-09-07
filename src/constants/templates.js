
export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Header, hero, two-column content, footer.',
    slots: [
      { id: 'header', label: 'Header', columns: 1 },
      { id: 'hero', label: 'Hero', columns: 1 },
      { id: 'content', label: 'Content ( 2 columns)', columns: 2 },
      { id: 'footer', label: 'Footer', columns: 1 },
    ]
  },
  {
    id: 'simple-blog',
    name: 'Simple Blog',
    description: 'Header, list, sidebar, footer.',
    slots: [
      { id: 'header', label: 'Header', columns: 1 },
      { id: 'main', label: 'Main Content', columns: 1 },
      { id: 'sidebar', label: 'Sidebar', columns: 1 },
      { id: 'footer', label: 'Footer', columns: 1 },
    ]
  }
]

export const ELEMENT_TYPES = [
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
]