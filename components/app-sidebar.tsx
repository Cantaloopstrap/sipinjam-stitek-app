"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Building2,
  Package,
  PlusCircle,
  CalendarDays,
  User,
  History,
  Users,
  CheckSquare,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, role, logout } = useAuth()

  const userNavigation = [
    { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "Data Ruangan", href: "/user/rooms", icon: Building2 },
    { name: "Data Barang", href: "/user/items", icon: Package },
    { name: "Ajukan Peminjaman", href: "/user/borrow", icon: PlusCircle },
    { name: "Jadwal & Tata Tertib", href: "/user/schedule", icon: CalendarDays },
    { name: "Riwayat Peminjaman", href: "/user/history", icon: History },
    { name: "Profile Saya", href: "/user/profile", icon: User },
  ]

  const adminNavigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Kelola Ruangan", href: "/admin/rooms", icon: Building2 },
    { name: "Kelola Barang", href: "/admin/items", icon: Package },
    { name: "Kelola Mahasiswa", href: "/admin/students", icon: Users },
    { name: "Validasi Peminjaman", href: "/admin/validation", icon: CheckSquare },
    { name: "Laporan", href: "/admin/reports", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const navigation = role === "admin" ? adminNavigation : userNavigation

  return (
    <Sidebar
      collapsible="icon"
      className={`sidebar-blur border-r ${role === "admin" ? "border-orange-500/20" : "border-blue-500/20"}`}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className={role === "admin" ? "hover:bg-orange-500/10" : "hover:bg-blue-500/10"}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex aspect-square size-8 items-center justify-center rounded-lg text-white ${role === "admin" ? "bg-orange-600" : "bg-blue-600"}`}
                >
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SIPINJAM</span>
                  <span className="truncate text-xs">STITEK Bontang</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.foto || "/placeholder.svg"} alt={user?.nama} />
                    <AvatarFallback className="rounded-lg">{user?.nama?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.nama}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <LogOut className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.foto || "/placeholder.svg"} alt={user?.nama} />
                      <AvatarFallback className="rounded-lg">
                        {user?.nama?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.nama}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={role === "admin" ? "/admin/settings" : "/user/profile"}>
                      <User className="mr-2 size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
