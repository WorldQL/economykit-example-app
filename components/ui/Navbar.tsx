import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import { type FC, useCallback, useMemo } from 'react'
import { Button } from './Button'
import { useAuth } from '~/lib/hooks/useAuth'

export type NavItems = [name: string, href: string][]
interface Props {
  nav: NavItems
  username: string
}

export const Navbar: FC<Props> = ({ nav, username }) => {
  const { logout } = useAuth()
  const { push } = useRouter()

  const handleSignOut = useCallback(() => {
    logout()
    void push('/login')
  }, [logout, push])

  return (
    <div className='z-10 flex h-16 w-full items-center gap-4 bg-white px-4 shadow'>
      <div className='mr-4 text-lg font-bold'>Example App</div>

      {nav.map(([item, href]) => (
        <NavbarItem href={href} key={href}>
          {item}
        </NavbarItem>
      ))}

      <div className='flex-grow' />

      <div>
        <strong>{username}</strong>
      </div>

      <div>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    </div>
  )
}

interface ItemProps {
  href: string
}

const NavbarItem: FC<PropsWithChildren<ItemProps>> = ({ href, children }) => {
  const { pathname } = useRouter()
  const active = useMemo<boolean>(() => href === pathname, [href, pathname])

  return (
    <Link
      className={clsx(
        'flex h-full flex-col justify-center border-y-2 border-y-transparent transition-colors',
        active && 'border-b-primary',
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
