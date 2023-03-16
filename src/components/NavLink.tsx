import Link from 'next/link'

export const NavLink = ({
  href,
  target,
  children,
}: {
  href: string
  target?: string
  children?: React.ReactNode
}) => {
  return (
    <Link
      href={href}
      target={target || '_self'}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
