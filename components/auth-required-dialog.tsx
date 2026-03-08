"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

interface AuthRequiredDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action?: string
}

export function AuthRequiredDialog({ open, onOpenChange, action }: AuthRequiredDialogProps) {
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl">{t('authRequired')}</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {action ? `${t('authRequiredMessage')} ${action}.` : t('authRequiredMessage')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button asChild size="lg" className="rounded-xl">
            <Link href="/auth/sign-up">{t('signUp')}</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="rounded-xl">
            <Link href="/auth/login">{t('login')}</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
