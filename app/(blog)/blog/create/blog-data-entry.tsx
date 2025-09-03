"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogData, ContentBlock } from './types'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function CreateBlogForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null)
  const [contentImageFiles, setContentImageFiles] = useState<{[key: number]: File}>({})
  const [formData, setFormData] = useState<BlogData>({
    title: '',
    author: '',
    publishedAt: new Date().toISOString().split('T')[0],
    readTime: '',
    tags: [],
    featuredImage: '',
    content: []
  })

  const [newTag, setNewTag] = useState('')

  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFeaturedImageFile(file)
    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file)
    setFormData(prev => ({ ...prev, featuredImage: previewUrl }))
  }

  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    setContentImageFiles(prev => ({ ...prev, [index]: file }))
    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file)
    updateContentBlock(index, { src: previewUrl })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addContentBlock = (type: string) => {
    const newBlock = {
      type,
      ...(type === 'paragraph' && { text: '' }),
      ...(type.startsWith('heading') && { text: '', level: parseInt(type.slice(-1)) }),
      ...(type === 'image' && { src: '', alt: '', caption: '' })
    }
    
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }))
  }

  const updateContentBlock = (index: number, updates: Partial<ContentBlock>) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.map((block, i) => 
        i === index ? { ...block, ...updates } : block
      )
    }))
  }

  const removeContentBlock = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create FormData for multipart upload
      const submitFormData = new FormData()
      
      // Add blog data as JSON string
      submitFormData.append('blogData', JSON.stringify(formData))
      
      // Add featured image file if exists
      if (featuredImageFile) {
        submitFormData.append('featuredImage', featuredImageFile)
      }
      
      // Add content image files
      formData.content.forEach((block, index) => {
        if (block.type === 'image' && contentImageFiles[index]) {
          submitFormData.append(`contentImage_${index}`, contentImageFiles[index])
        }
      })

      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: submitFormData, // No Content-Type header - let browser set it for multipart
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create blog')
      }

      const result = await response.json()
      console.log('Blog created successfully:', result)
      
      // Clean up object URLs
      if (formData.featuredImage.startsWith('blob:')) {
        URL.revokeObjectURL(formData.featuredImage)
      }
      formData.content.forEach(block => {
        if (block.type === 'image' && block.src?.startsWith('blob:')) {
          URL.revokeObjectURL(block.src)
        }
      })
      
      router.push('/blog')
      
    } catch (error) {
      console.error('Error submitting blog:', error)
      setError(error instanceof Error ? error.message : 'Failed to create blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pb-12 mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        {/* Form Section */}
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Blog Details</h2>
          <QueryClientProvider client={queryClient}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter blog title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="5 minutes"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Featured Image
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                  {formData.featuredImage && (
                    <div className="relative">
                      <img
                        src={formData.featuredImage}
                        alt="Featured preview"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.featuredImage.startsWith('blob:')) {
                            URL.revokeObjectURL(formData.featuredImage)
                          }
                          setFormData(prev => ({ ...prev, featuredImage: '' }))
                          setFeaturedImageFile(null)
                        }}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-destructive/80"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Content Builder */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Content
              </label>
              <div className="space-y-3">
                {formData.content.map((block, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-muted/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground capitalize">
                        {block.type === 'heading1' ? 'Heading 1' :
                         block.type === 'heading2' ? 'Heading 2' :
                         block.type === 'heading3' ? 'Heading 3' :
                         block.type === 'heading4' ? 'Heading 4' :
                         block.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeContentBlock(index)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        Remove
                      </button>
                    </div>
                    
                    {(block.type === 'paragraph' || block.type.startsWith('heading')) && (
                      <textarea
                        value={block.text || ''}
                        onChange={(e) => updateContentBlock(index, { text: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        rows={block.type === 'paragraph' ? 3 : 2}
                        placeholder={`Enter ${block.type} text`}
                      />
                    )}
                    
                    {block.type === 'image' && (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Upload Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleContentImageUpload(e, index)}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-secondary file:text-secondary-foreground"
                          />
                        </div>
                        {block.src && (
                          <div className="relative">
                            <img
                              src={block.src}
                              alt={block.alt || 'Content image'}
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const block = formData.content[index]
                                if (block.src?.startsWith('blob:')) {
                                  URL.revokeObjectURL(block.src)
                                }
                                updateContentBlock(index, { src: '' })
                                setContentImageFiles(prev => {
                                  const updated = { ...prev }
                                  delete updated[index]
                                  return updated
                                })
                              }}
                              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-destructive/80"
                            >
                              ×
                            </button>
                          </div>
                        )}
                        <input
                          type="text"
                          value={block.alt || ''}
                          onChange={(e) => updateContentBlock(index, { alt: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Alt text (for accessibility)"
                        />
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => updateContentBlock(index, { caption: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Caption (optional)"
                        />
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => addContentBlock('paragraph')}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
                  >
                    + Paragraph
                  </button>
                  <button
                    type="button"
                    onClick={() => addContentBlock('heading1')}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
                  >
                    + H1
                  </button>
                  <button
                    type="button"
                    onClick={() => addContentBlock('heading2')}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
                  >
                    + H2
                  </button>
                  <button
                    type="button"
                    onClick={() => addContentBlock('heading3')}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
                  >
                    + H3
                  </button>
                  <button
                    type="button"
                    onClick={() => addContentBlock('heading4')}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
                  >
                    + H4
                  </button>
                  <button
                    type="button"
                    onClick={() => addContentBlock('image')}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
                  >
                    + Image
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4 border-t border-border">
                <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {loading ? 'Publishing...' : 'Publish Blog'}
                </button>
              <button
                type="button"
                onClick={() => router.push('/blog')}
                className="px-6 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
          </QueryClientProvider>
        </div>

        {/* Live Preview Section - Now Sticky */}
        <div className="lg:sticky lg:top-16 lg:h-fit">
          <div className="bg-card rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Live Preview</h2>
            
            <div className="space-y-4">
              {formData.title && (
                <h1 className="text-2xl font-bold text-foreground">{formData.title}</h1>
              )}
              
              {(formData.author || formData.publishedAt || formData.readTime) && (
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b border-border pb-4">
                  {formData.author && <span>By {formData.author}</span>}
                  {formData.publishedAt && <span>{new Date(formData.publishedAt).toLocaleDateString()}</span>}
                  {formData.readTime && <span>{formData.readTime}</span>}
                </div>
              )}
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {formData.featuredImage && (
                <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-4">
                {formData.content.map((block, index) => (
                  <div key={index}>
                    {block.type === 'paragraph' && block.text && (
                      <p className="text-foreground leading-relaxed">{block.text}</p>
                    )}
                    {block.type === 'heading1' && block.text && (
                      <h1 className="text-3xl font-bold text-foreground">{block.text}</h1>
                    )}
                    {block.type === 'heading2' && block.text && (
                      <h2 className="text-2xl font-bold text-foreground">{block.text}</h2>
                    )}
                    {block.type === 'heading3' && block.text && (
                      <h3 className="text-xl font-bold text-foreground">{block.text}</h3>
                    )}
                    {block.type === 'heading4' && block.text && (
                      <h4 className="text-lg font-bold text-foreground">{block.text}</h4>
                    )}
                    {block.type === 'image' && block.src && (
                      <div className="space-y-2">
                        <img
                          src={block.src}
                          alt={block.alt || ''}
                          className="w-full rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        {block.caption && (
                          <p className="text-sm text-muted-foreground italic text-center">
                            {block.caption}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {formData.content.length === 0 && (
                <p className="text-muted-foreground italic">
                  Start adding content blocks to see your blog preview here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add error display */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
    </div>
  )
}
