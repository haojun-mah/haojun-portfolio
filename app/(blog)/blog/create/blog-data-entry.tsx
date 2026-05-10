"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { BlogData } from "./types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CreateBlogForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<BlogData>({
    title: "",
    author: "Hao Jun",
    publishedAt: new Date().toISOString().split("T")[0],
    readTime: "",
    tags: [],
    featuredImage: "",
    content: "",
  });

  const [newTag, setNewTag] = useState("");

  const handleDragOver = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        await uploadImageToMarkdown(file);
      }
    }
  };

  const uploadImageToMarkdown = async (file: File) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    const placeholder = `![Uploading ${file.name}...]()\n`;

    const newContent =
      formData.content.substring(0, startPos) +
      placeholder +
      formData.content.substring(endPos);

    setFormData((prev) => ({ ...prev, content: newContent }));

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file, // sending file directly to vercel blob per doc approach
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        content: prev.content.replace(
          placeholder,
          `![${file.name}](${data.url})\n`,
        ),
      }));
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        content: prev.content.replace(
          placeholder,
          `![Failed to upload ${file.name}]()\n`,
        ),
      }));
      console.error(err);
      alert("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate
      if (!formData.title.trim()) throw new Error("Title is required");
      if (!formData.content.trim()) throw new Error("Content is required");

      let finalFeaturedImageUrl = formData.featuredImage;
      if (featuredImageFile) {
        const uploadRes = await fetch(
          `/api/upload?filename=${encodeURIComponent(featuredImageFile.name)}`,
          {
            method: "POST",
            body: featuredImageFile,
          },
        );
        if (!uploadRes.ok) throw new Error("Featured image upload failed");
        const uploadData = await uploadRes.json();
        finalFeaturedImageUrl = uploadData.url;
      }

      const submitData = new FormData();
      submitData.append(
        "blogData",
        JSON.stringify({ ...formData, featuredImage: finalFeaturedImageUrl }),
      );

      const response = await fetch("/api/blogs", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create blog");
      }

      setSuccess("Blog created successfully!");
      setTimeout(() => {
        router.push("/blog");
        router.refresh();
      }, 1500);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md border border-destructive/20 font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-primary/20 text-primary p-4 rounded-md border border-primary/30 font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-lg border shadow-sm space-y-4">
              <h2 className="text-xl font-semibold mb-4">Meta Info</h2>

              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) =>
                      setFormData({ ...formData, publishedAt: e.target.value })
                    }
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    placeholder="e.g. 5 min read"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (
                          newTag.trim() &&
                          !formData.tags.includes(newTag.trim())
                        ) {
                          setFormData({
                            ...formData,
                            tags: [...formData.tags, newTag.trim()],
                          });
                          setNewTag("");
                        }
                      }
                    }}
                    placeholder="Press enter to add"
                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        newTag.trim() &&
                        !formData.tags.includes(newTag.trim())
                      ) {
                        setFormData({
                          ...formData,
                          tags: [...formData.tags, newTag.trim()],
                        });
                        setNewTag("");
                      }
                    }}
                    className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            tags: formData.tags.filter((t) => t !== tag),
                          })
                        }
                        className="hover:text-destructive"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) setFeaturedImageFile(file);
                  }}
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>

              <div className="pt-4 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-md font-medium text-primary-foreground transition-colors ${
                    loading
                      ? "bg-primary/50 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {loading ? "Publishing..." : "Publish Blog Post"}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-card border rounded-lg shadow-sm flex flex-col h-[800px] overflow-hidden">
            <div className="grid grid-cols-2 h-full divide-x">
              {/* Editor */}
              <div className="flex flex-col h-full">
                <div className="p-3 border-b bg-muted/50 font-medium text-sm flex justify-between items-center">
                  <span>Markdown Editor</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    Drop images here
                  </span>
                </div>
                <textarea
                  ref={textareaRef}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  placeholder="Start writing using Markdown... Drop images here to upload!"
                  className="w-full flex-1 resize-none bg-background p-4 outline-none focus:outline-none font-mono text-sm leading-relaxed"
                  spellCheck="false"
                />
              </div>

              {/* Preview */}
              <div className="flex flex-col h-full overflow-hidden">
                <div className="p-3 border-b bg-muted/50 font-medium text-sm shrink-0">
                  Live Preview
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-background">
                  <article className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-muted-foreground prose-img:rounded-md max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || "*Preview will appear here...*"}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
