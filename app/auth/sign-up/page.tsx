'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Page() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError(language === 'en' ? 'Passwords do not match' : 'Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters' : 'La contraseña debe tener al menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      
      // Create user profile in Users table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('Users')
          .insert({
            id: data.user.id,
            email: email,
            full_name: fullName,
            tags: [],
            skills: [],
            needs: [],
            background: '',
            age_bracket: '',
          })
        
        if (profileError) {
          console.error('[v0] Error creating profile:', profileError)
        }
      }
      
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
      </div>
      
      {/* Language toggle */}
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'EN' : 'ES'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('es')}>
              Español
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/foundher-logo.png" 
                alt="FoundHer" 
                width={44} 
                height={44} 
                className="rounded-xl"
              />
              <span className="text-2xl font-bold text-foreground">FoundHer</span>
            </Link>
          </div>
          <Card className="border-border/50 rounded-2xl backdrop-blur-sm bg-card/80">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{language === 'en' ? 'Join FoundHer' : 'Únete a FoundHer'}</CardTitle>
              <CardDescription>{language === 'en' ? 'Start your journey today' : 'Comienza tu viaje hoy'}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">{language === 'en' ? 'Full Name' : 'Nombre Completo'}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={language === 'en' ? 'Jane Doe' : 'María García'}
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">{language === 'en' ? 'Password' : 'Contraseña'}</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password">{language === 'en' ? 'Confirm Password' : 'Confirmar Contraseña'}</Label>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full rounded-xl" size="lg" disabled={isLoading}>
                    {isLoading 
                      ? (language === 'en' ? 'Creating account...' : 'Creando cuenta...') 
                      : t('signUp')
                    }
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  {language === 'en' ? 'Already have an account?' : '¿Ya tienes una cuenta?'}{' '}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4 text-primary hover:text-primary/80"
                  >
                    {t('login')}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
