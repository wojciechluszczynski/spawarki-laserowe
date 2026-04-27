import { IconPhone } from './Icons'

export function FloatingCta() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="tel:+48570854886"
        className="group flex items-center gap-2.5 h-12 pl-4 pr-5 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
        style={{
          backgroundColor: '#FFA52F',
          color: '#0D1117',
          boxShadow: '0 4px 20px rgba(255,165,47,0.4)',
        }}
        aria-label="Zadzwoń i dowiedz się więcej"
      >
        <IconPhone size={17} />
        <span className="font-black text-sm whitespace-nowrap">Zadzwoń i dowiedz się więcej</span>
      </a>
    </div>
  )
}
