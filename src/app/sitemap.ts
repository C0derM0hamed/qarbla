import { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base routes
  const routes = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/karbala`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/karbala/cards`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // In production, we would fetch dynamic slugs from Supabase here.
  // For now, we mock the URLs for the 13 nights.
  const nightRoutes = Array.from({ length: 13 }).map((_, i) => ({
    url: `${SITE_URL}/karbala/night/night-${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...nightRoutes];
}
