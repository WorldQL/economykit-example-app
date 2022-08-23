import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type FC, PropsWithChildren, useCallback, useMemo } from 'react'
import { useAuth } from '~/lib/hooks/useAuth'
import { Button } from './Button'

export type NavItems = Array<[name: string, href: string]>
interface Props {
  nav: NavItems
}

export const Navbar: FC<Props> = ({ nav }) => {
  const { logout } = useAuth()
  const { push } = useRouter()

  const handleSignOut = useCallback(() => {
    logout()
    void push('/login')
  }, [logout, push])

  return (
    <div className='z-10 flex items-center gap-4 w-full px-4 h-16 bg-white shadow'>
      <div className='text-lg font-bold mr-4'>Example App</div>

      {nav.map(([item, href]) => (
        <NavbarItem key={href} href={href}>
          {item}
        </NavbarItem>
      ))}

      <div className='flex-grow' />

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
    <Link passHref href={href}>
      <a
        className={clsx(
          'flex flex-col justify-center h-full border-y-2 border-y-transparent transition-colors',
          active && 'border-b-primary'
        )}
      >
        {children}
      </a>
    </Link>
  )
}
