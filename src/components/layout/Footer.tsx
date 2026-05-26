import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/os", label: "Runix OS" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/early-access", label: "Early Access" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/community", label: "Discussion" },
      { href: "/news", label: "Updates" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Contact" },
      { href: "/login", label: "Account" },
      { href: "/register", label: "Register" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:shadow-lg"
                style={{ background: "var(--primary)" }}
              >
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                Runix
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-muted)" }}>
              Building the next-generation operating system for modern computing.
              Open, secure, and built for the future.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[var(--primary)]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p>&copy; {new Date().getFullYear()} Runix. All rights reserved.</p>
          <div className="flex gap-6">
              {["GitHub", "Twitter", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="transition-colors duration-200 hover:text-[var(--text-primary)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {social}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
