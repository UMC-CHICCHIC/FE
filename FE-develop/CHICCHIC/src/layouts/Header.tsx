import { Link } from 'react-router-dom';
import { LuSprayCan, LuBookmark, LuUser, LuSearch } from 'react-icons/lu';

interface NavItem {
  path: string;
  label: string;
}

const navList: NavItem[] = [
  { path: "/shopping", label: "SHOPPING" },
  { path: "/community", label: "COMMUNITY" },
  { path: "/personal-perfume-test", label: "PERSONAL PERFUME TEST" },
  { path: "/brand", label: "BRAND" },
];

export function Header() {
  return (
    <header className="py-4 bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <LuSprayCan className="h-8 w-8" />
            <h1 className="text-3xl font-headline font-bold tracking-tight">
              CHICCHIC
            </h1>
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-8">
              {navList.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm font-semibold tracking-wider text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                    placeholder="Search"
                    className="bg-white/20 border border-white/30 rounded-full pl-10 placeholder:text-white/50 text-white focus:bg-white/30 focus-visible:ring-offset-0 focus-visible:ring-white/50 h-10 px-4 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white/20 h-10 w-10">
                <LuBookmark className="h-6 w-6" />
                <span className="sr-only">Bookmarks</span>
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white/20 h-10 w-10">
                <LuUser className="h-6 w-6" />
                <span className="sr-only">Profile</span>
            </button>
        </div>
      </div>
    </header>
  );
}