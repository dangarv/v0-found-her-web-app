"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  
  const footerLinks = {
    platform: [
      { name: t('opportunities'), href: "/opportunities" },
      { name: t('collaborate'), href: "/collaborate" },
      { name: t('groups'), href: "/groups" },
      { name: t('messages'), href: "/messages" },
    ],
    resources: [
      { name: t('blog'), href: "#" },
      { name: t('guides'), href: "#" },
      { name: t('successStories'), href: "#" },
      { name: t('faq'), href: "#" },
    ],
    company: [
      { name: t('about'), href: "#" },
      { name: t('careers'), href: "#" },
      { name: t('contact'), href: "#" },
      { name: t('press'), href: "#" },
    ],
    legal: [
      { name: t('privacy'), href: "#" },
      { name: t('terms'), href: "#" },
      { name: t('cookies'), href: "#" },
    ],
  }

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">FoundHer</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {t('footerDescription')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('platform')}</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('resources')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('legal')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} FoundHer. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}
