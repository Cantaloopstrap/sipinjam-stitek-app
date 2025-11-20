export function Footer() {
  return (
    <footer className="w-full border-t bg-zinc-950 py-6 text-zinc-400">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-center text-sm leading-loose md:text-left">
          &copy; 2025 <span className="font-semibold text-zinc-100">STITEK Bontang</span>. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-zinc-100 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-zinc-100 hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
