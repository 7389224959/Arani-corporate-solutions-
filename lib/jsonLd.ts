// JSON-LD Schema Markup Generator for Google for Jobs, Organization & Article SEO

import { Job, Article } from './sampleData';

/**
 * Generates JobPosting JSON-LD for Google for Jobs compatibility
 */
export function generateJobPostingSchema(job: Job) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: `
      <p>${job.description}</p>
      <h3>Requirements:</h3>
      <ul>${job.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>
      <h3>Benefits & Perks:</h3>
      <ul>${job.benefits.map((b) => `<li>${b}</li>`).join('')}</ul>
    `.trim(),
    identifier: {
      '@type': 'PropertyValue',
      name: 'Arani Corporate Solutions',
      value: job.id
    },
    datePosted: '2026-08-01',
    validThrough: '2026-12-31',
    employmentType: job.type === 'Full-Time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.isConfidential ? 'Top Tier Bank / Enterprise Firm' : job.companyName,
      sameAs: 'https://aranicorporate.com',
      logo: 'https://aranicorporate.com/arani-logo.png'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.split('/')[0].trim(),
        addressCountry: 'IN'
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'YEAR'
      }
    }
  };
}

/**
 * Generates RecruitmentAgency & Organization JSON-LD Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RecruitmentAgency',
    name: 'Arani Corporate Solutions',
    alternateName: 'Arani Job Consultancy & HR Services',
    url: 'https://aranicorporate.com',
    logo: 'https://aranicorporate.com/arani-logo.png',
    description: 'Premier recruitment consultancy specializing in banking jobs, corporate placements, executive search, background verification, and HR advisory.',
    slogan: 'GROW WITH THE OPPORTUNITY',
    telephone: '+91-1800-419-8282',
    email: 'contact@aranicorporate.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Arani Towers, BKC Financial Hub',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400051',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.facebook.com/aranicorporatesolutions',
      'https://www.linkedin.com/company/arani-corporate-solutions',
      'https://www.instagram.com/aranicorporate'
    ]
  };
}

/**
 * Generates NewsArticle / Article JSON-LD Schema
 */
export function generateArticleSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: [article.image],
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: 'Banking Talent Consultant',
      worksFor: {
        '@type': 'Organization',
        name: 'Arani Corporate Solutions'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Arani Corporate Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aranicorporate.com/arani-logo.png'
      }
    }
  };
}
