import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

function normalizeTags(tags?: string | string[]) {
  if (!tags) return '[]';
  if (Array.isArray(tags)) return JSON.stringify(tags.filter(Boolean));
  try {
    const parsed = JSON.parse(tags);
    if (Array.isArray(parsed)) return JSON.stringify(parsed);
  } catch {
    // ignore
  }
  const normalized = String(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
  return JSON.stringify(normalized);
}

function normalizeJson(value: any) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object') return JSON.stringify(parsed);
    } catch {
      const raw = value.trim();
      if (raw.indexOf('\n') !== -1 || raw.indexOf(',') !== -1) {
        const arr = raw.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
        return JSON.stringify(arr);
      }
      return JSON.stringify(raw);
    }
    return value;
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

// === BLOG POSTS ===
export async function getPost(id: number) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getAllPosts() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPostBySlug(slug: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function createPost(data: any) {
  if (!supabase) throw new Error('Supabase not configured');
  const insertData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    cover_image: data.cover_image || null,
    read_time: data.read_time || 0,
    is_featured: data.is_featured ? true : false,
    tags: normalizeTags(data.tags),
  };
  const { data: result, error } = await supabase.from('blog_posts').insert([insertData]).select('id').single();
  if (error) throw error;
  return result?.id;
}

export async function updatePost(id: number, data: any) {
  if (!supabase) throw new Error('Supabase not configured');
  const updateData: any = {};
  if (data.title) updateData.title = data.title;
  if (data.slug) updateData.slug = data.slug;
  if (data.excerpt) updateData.excerpt = data.excerpt;
  if (data.content) updateData.content = data.content;
  if (data.cover_image !== undefined) updateData.cover_image = data.cover_image || null;
  if (data.read_time !== undefined) updateData.read_time = data.read_time;
  if (data.is_featured !== undefined) updateData.is_featured = data.is_featured ? true : false;
  if (data.tags !== undefined) updateData.tags = normalizeTags(data.tags);
  
  if (Object.keys(updateData).length === 0) return;
  
  const { error } = await supabase.from('blog_posts').update(updateData).eq('id', id);
  if (error) throw error;
}

export async function deletePost(id: number) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

// === PROJECTS ===
export async function getProject(id: number) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getAllProjects() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('projects').select('*').order('featured', { ascending: false }).order('year', { ascending: false }).order('published_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getProjectBySlug(slug: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function createProject(data: any) {
  if (!supabase) throw new Error('Supabase not configured');
  const insertData = {
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    description: data.description || null,
    content: data.content || null,
    cover_image: data.cover_image || null,
    cover_alt: data.cover_alt || null,
    tech: normalizeJson(data.tech || '[]'),
    role: data.role || null,
    year: data.year || null,
    featured: data.featured ? true : false,
    client: data.client || null,
    duration: data.duration || null,
    links: normalizeJson(data.links || '{}'),
    images: normalizeJson(data.images || '[]'),
  };
  const { data: result, error } = await supabase.from('projects').insert([insertData]).select('id').single();
  if (error) throw error;
  return result?.id;
}

export async function updateProject(id: number, data: any) {
  if (!supabase) throw new Error('Supabase not configured');
  const updateData: any = {};
  if (data.title) updateData.title = data.title;
  if (data.slug) updateData.slug = data.slug;
  if (data.summary) updateData.summary = data.summary;
  if (data.description !== undefined) updateData.description = data.description || null;
  if (data.content !== undefined) updateData.content = data.content || null;
  if (data.cover_image !== undefined) updateData.cover_image = data.cover_image || null;
  if (data.cover_alt !== undefined) updateData.cover_alt = data.cover_alt || null;
  if (data.tech !== undefined) updateData.tech = normalizeJson(data.tech || '[]');
  if (data.role !== undefined) updateData.role = data.role || null;
  if (data.year !== undefined) updateData.year = data.year || null;
  if (data.featured !== undefined) updateData.featured = data.featured ? true : false;
  if (data.client !== undefined) updateData.client = data.client || null;
  if (data.duration !== undefined) updateData.duration = data.duration || null;
  if (data.links !== undefined) updateData.links = normalizeJson(data.links || '{}');
  if (data.images !== undefined) updateData.images = normalizeJson(data.images || '[]');
  
  if (Object.keys(updateData).length === 0) return;
  
  const { error } = await supabase.from('projects').update(updateData).eq('id', id);
  if (error) throw error;
}

export async function deleteProject(id: number) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// === PRODUCTS ===
export async function getProduct(id: number) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getAllProducts() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('products').select('*').order('published_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getProductBySlug(slug: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function createProduct(data: any) {
  if (!supabase) throw new Error('Supabase not configured');
  const insertData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    cover_image: data.cover_image || null,
    link: data.link || null,
    price: data.price || null,
    is_featured: data.is_featured ? true : false,
    tags: normalizeTags(data.tags),
  };
  const { data: result, error } = await supabase.from('products').insert([insertData]).select('id').single();
  if (error) throw error;
  return result?.id;
}

export async function updateProduct(id: number, data: any) {
  if (!supabase) throw new Error('Supabase not configured');
  const updateData: any = {};
  if (data.title) updateData.title = data.title;
  if (data.slug) updateData.slug = data.slug;
  if (data.excerpt) updateData.excerpt = data.excerpt;
  if (data.content) updateData.content = data.content;
  if (data.cover_image !== undefined) updateData.cover_image = data.cover_image || null;
  if (data.link !== undefined) updateData.link = data.link || null;
  if (data.price !== undefined) updateData.price = data.price || null;
  if (data.is_featured !== undefined) updateData.is_featured = data.is_featured ? true : false;
  if (data.tags !== undefined) updateData.tags = normalizeTags(data.tags);
  
  if (Object.keys(updateData).length === 0) return;
  
  const { error } = await supabase.from('products').update(updateData).eq('id', id);
  if (error) throw error;
}

export async function deleteProduct(id: number) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}
