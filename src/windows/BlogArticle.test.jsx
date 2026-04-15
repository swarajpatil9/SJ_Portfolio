import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import BlogArticle from './BlogArticle.jsx';

describe('blog slug fallback', () => {
  it('renders not-found state for unknown slugs', () => {
    render(
      <MemoryRouter initialEntries={['/blog/unknown-post']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Article not found')).toBeInTheDocument();
  });
});
