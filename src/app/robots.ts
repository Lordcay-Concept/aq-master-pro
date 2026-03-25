import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/staff/', '/dashboard/', '/payment/'],
    },
    sitemap: 'https://aqmaster.com/sitemap.xml',
  }
}