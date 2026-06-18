import React, { useState } from 'react';
import MediaUpload from './MediaUpload';
import { apiFetch, resolveMediaUrl } from '../utils/api';
import { fetchSectionBackgrounds, saveSectionBackground, resetSectionBackground, resolveBackgroundUrl } from '../utils/backgrounds';
import { SECTION_DEFS } from '../data/sectionBackgrounds';
import './AdminPanel.css';

const emptyBlog = {
  title: '',
  caption: '',
  content: '',
  category: 'GUIDES',
  mediaType: 'image',
  mediaUrl: ''
};

const emptyHero = {
  title: 'Farokht hero video',
  caption: 'Discover your favorite brands through content from all across Pakistan.',
  mediaType: 'video',
  mediaUrl: ''
};

export default function AdminPanel({ onHeroSaved, onBlogsChanged, onBackgroundsChanged }) {
  const [message, setMessage] = useState('');
  const [heroForm, setHeroForm] = useState(emptyHero);
  const [blogForm, setBlogForm] = useState(emptyBlog);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [backgrounds, setBackgrounds] = useState({});
  const [savingSection, setSavingSection] = useState('');

  const loadBlogs = async () => {
    const response = await apiFetch('/api/stories?type=blog');
    if (response.ok) {
      const data = await response.json();
      setBlogs(data);
    }
  };

  const loadBackgrounds = async () => {
    const data = await fetchSectionBackgrounds();
    setBackgrounds(data);
  };

  React.useEffect(() => {
    loadBlogs();
    loadBackgrounds();
  }, []);

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveHero = async (e) => {
    e.preventDefault();
    if (!heroForm.mediaUrl.trim()) {
      setMessage('Upload or paste a hero video/image URL first.');
      return;
    }

    const response = await apiFetch('/api/hero', {
      method: 'POST',
      body: JSON.stringify(heroForm)
    });

    if (response.ok) {
      const hero = await response.json();
      setMessage('Hero media saved.');
      onHeroSaved?.(hero);
    } else {
      const err = await response.json();
      setMessage(err.msg || 'Failed to save hero.');
    }
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      setMessage('Blog title is required.');
      return;
    }

    const method = editingBlog ? 'PUT' : 'POST';
    const path = editingBlog
      ? `/api/stories/${editingBlog._id || editingBlog.id}`
      : '/api/stories';

    const response = await apiFetch(path, {
      method,
      body: JSON.stringify({ ...blogForm, isHero: false })
    });

    if (response.ok) {
      setMessage(editingBlog ? 'Blog updated.' : 'Blog created.');
      setBlogForm(emptyBlog);
      setEditingBlog(null);
      loadBlogs();
      onBlogsChanged?.();
    } else {
      const err = await response.json();
      setMessage(err.msg || 'Failed to save blog.');
    }
  };

  const editBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || '',
      caption: blog.caption || '',
      content: blog.content || '',
      category: blog.category || 'GUIDES',
      mediaType: blog.mediaType || 'image',
      mediaUrl: blog.mediaUrl || ''
    });
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    const response = await apiFetch(`/api/stories/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setMessage('Blog deleted.');
      loadBlogs();
      onBlogsChanged?.();
      if (editingBlog && (editingBlog._id === id || editingBlog.id === id)) {
        setEditingBlog(null);
        setBlogForm(emptyBlog);
      }
    }
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    setBlogForm(emptyBlog);
  };

  const handleBackgroundUploaded = async (sectionId, { mediaUrl }) => {
    setSavingSection(sectionId);
    try {
      await saveSectionBackground(sectionId, mediaUrl);
      setBackgrounds((prev) => ({ ...prev, [sectionId]: mediaUrl }));
      setMessage('Background updated.');
      onBackgroundsChanged?.();
    } catch (err) {
      setMessage(err.message || 'Failed to save background.');
    } finally {
      setSavingSection('');
    }
  };

  const handleBackgroundReset = async (sectionId) => {
    setSavingSection(sectionId);
    try {
      const result = await resetSectionBackground(sectionId);
      setBackgrounds((prev) => ({ ...prev, [sectionId]: result.imageUrl }));
      setMessage('Background reset to default.');
      onBackgroundsChanged?.();
    } catch (err) {
      setMessage(err.message || 'Failed to reset background.');
    } finally {
      setSavingSection('');
    }
  };

  return (
    <aside className="admin-panel" id="admin-panel">
      <div className="admin-panel-header">
        <h3>Admin controls</h3>
        <p>Manage hero video and blog posts (visible to all visitors once saved).</p>
      </div>

      <div className="admin-panel-grid">
        <div className="admin-panel-card">
          <h4>Hero video / image</h4>
          <form onSubmit={saveHero} className="admin-form">
            <label>
              Title
              <input name="title" value={heroForm.title} onChange={handleHeroChange} />
            </label>
            <label>
              Caption
              <textarea name="caption" value={heroForm.caption} onChange={handleHeroChange} rows={2} />
            </label>
            <label>
              Type
              <select name="mediaType" value={heroForm.mediaType} onChange={handleHeroChange}>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </label>
            <MediaUpload
              label="Upload file"
              onUploaded={({ mediaUrl, mediaType }) =>
                setHeroForm((prev) => ({ ...prev, mediaUrl, mediaType }))
              }
            />
            <label>
              Or media URL
              <input name="mediaUrl" value={heroForm.mediaUrl} onChange={handleHeroChange} placeholder="/uploads/… or https://…" />
            </label>
            {heroForm.mediaUrl && (
              <div className="admin-preview">
                {heroForm.mediaType === 'video' ? (
                  <video src={resolveMediaUrl(heroForm.mediaUrl)} controls muted />
                ) : (
                  <img src={resolveMediaUrl(heroForm.mediaUrl)} alt="Hero preview" />
                )}
              </div>
            )}
            <button type="submit" className="btn btn-orange">Save hero</button>
          </form>
        </div>

        <div className="admin-panel-card">
          <h4>{editingBlog ? 'Edit blog' : 'Create blog'}</h4>
          <form onSubmit={saveBlog} className="admin-form">
            <label>
              Category tag
              <input name="category" value={blogForm.category} onChange={handleBlogChange} placeholder="GUIDES" />
            </label>
            <label>
              Title
              <input name="title" value={blogForm.title} onChange={handleBlogChange} required />
            </label>
            <label>
              Summary
              <input name="caption" value={blogForm.caption} onChange={handleBlogChange} />
            </label>
            <label>
              Full content
              <textarea name="content" value={blogForm.content} onChange={handleBlogChange} rows={4} />
            </label>
            <label>
              Media type
              <select name="mediaType" value={blogForm.mediaType} onChange={handleBlogChange}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </label>
            <MediaUpload
              label="Upload cover"
              onUploaded={({ mediaUrl, mediaType }) =>
                setBlogForm((prev) => ({ ...prev, mediaUrl, mediaType }))
              }
            />
            <label>
              Or media URL
              <input name="mediaUrl" value={blogForm.mediaUrl} onChange={handleBlogChange} />
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="btn btn-orange">
                {editingBlog ? 'Update blog' : 'Publish blog'}
              </button>
              {editingBlog && (
                <button type="button" className="btn btn-outline-dark" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="admin-panel-card admin-bg-card">
        <h4>Section backgrounds</h4>
        <p className="admin-bg-hint">Upload a new photo for any section below, or reset it to the default.</p>
        <div className="admin-bg-grid">
          {SECTION_DEFS.map((section) => {
            const current = backgrounds[section.id] || section.default;
            const isDefault = current === section.default;
            return (
              <div key={section.id} className="admin-bg-row">
                <div className="admin-bg-thumb">
                  <img src={resolveBackgroundUrl(current)} alt={`${section.label} background`} />
                </div>
                <div className="admin-bg-controls">
                  <span className="admin-bg-label">{section.label}</span>
                  <MediaUpload
                    label={savingSection === section.id ? 'Saving…' : 'Upload new'}
                    accept="image/*"
                    onUploaded={(result) => handleBackgroundUploaded(section.id, result)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-dark admin-bg-reset"
                    onClick={() => handleBackgroundReset(section.id)}
                    disabled={isDefault || savingSection === section.id}
                  >
                    Reset to default
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {blogs.length > 0 && (
        <div className="admin-blog-list">
          <h4>Published blogs</h4>
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id || blog.id}>
                <span>{blog.title}</span>
                <div className="admin-blog-list-actions">
                  <button type="button" onClick={() => editBlog(blog)}>Edit</button>
                  <button type="button" className="danger" onClick={() => deleteBlog(blog._id || blog.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && <p className="admin-panel-message">{message}</p>}
    </aside>
  );
}
