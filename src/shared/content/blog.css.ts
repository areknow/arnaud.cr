export const BLOG_CSS_CONTENT = `/* Blog Styles */
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.blog-post {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.blog-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.blog-content {
  color: var(--text-primary);
}

.blog-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

.blog-content p {
  margin-bottom: 1rem;
}

.blog-content code {
  background: var(--bg-tertiary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.blog-content pre {
  background: var(--bg-tertiary);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-container {
    padding: 1rem;
  }
  
  .blog-post {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 1.5rem;
  }
}`;
