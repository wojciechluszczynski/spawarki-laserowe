import { Hero } from '@/components/home/Hero'
import { EditorialBanner } from '@/components/home/EditorialBanner'
import { MachinesShowcase } from '@/components/home/MachinesShowcase'
import { ProductHighlight } from '@/components/home/ProductHighlight'
import { ConfigGallery } from '@/components/home/ConfigGallery'
import { WhyUs } from '@/components/home/WhyUs'
import { Industries } from '@/components/home/Industries'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaBanner } from '@/components/home/CtaBanner'
import faqData from '../../content/site/faq.json'
import type { FAQItem } from '@/types/content'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Spawarki Laserowe',
  url: 'https://spawarkilaserowe.com',
  description: 'Serwis doradzajacy przy wyborze spawarek laserowych dla firm produkcyjnych.',
}

function buildFaqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export default function HomePage() {
  const faq = faqData as FAQItem[]
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faq)) }}
      />
      <Hero />
      <EditorialBanner />
      <MachinesShowcase />
      <ProductHighlight />
      <ConfigGallery />
      <WhyUs />
      <Industries />
      <FaqSection items={faq} />
      <CtaBanner />
    </>
  )
}
