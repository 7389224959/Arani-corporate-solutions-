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
      name: 'Aranii Corporate Solutions',
      value: job.id
    },
    datePosted: '2026-08-01',
    validThrough: '2026-12-31',
    employmentType: job.type === 'Full-Time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.isConfidential ? 'Top Tier Bank / Enterprise Firm' : job.companyName,
      sameAs: 'https://araniicorporate.com',
      logo: 'https://araniicorporate.com/aranii-logo.png'
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
    name: 'Aranii Corporate Solutions',
    alternateName: 'Aranii Job Consultancy & HR Services',
    url: 'https://araniicorporate.com',
    logo: 'https://araniicorporate.com/aranii-logo.png',
    description: 'Premier recruitment consultancy specializing in banking jobs, corporate placements, executive search, background verification, and HR advisory.',
    slogan: 'GROW WITH THE OPPORTUNITY',
    telephone: '+91-1800-419-8282',
    email: 'contact@araniicorporate.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Aranii Towers, BKC Financial Hub',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400051',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.facebook.com/araniicorporatesolutions',
      'https://www.linkedin.com/company/aranii-corporate-solutions',
      'https://www.instagram.com/araniicorporate'
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
        name: 'Aranii Corporate Solutions'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aranii Corporate Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://araniicorporate.com/aranii-logo.png'
      }
    }
  };
}
