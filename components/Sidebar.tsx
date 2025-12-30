"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ChevronDown, PanelLeft, Rocket, Menu } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ModeToggle } from "@/components/ModeToogle"
import { useScreenSize } from "@/hooks/useScreenSize"

interface SubItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
  disabled?: boolean
  subItems?: SubItem[]
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

const sidebarSections: SidebarSection[] = [
  {
    title: "General",
    items: [
      {
        icon: <Rocket />,
        label: "Mission Control",
        href: "/",
      },
    ],
  },
]

interface SidebarContentProps {
  isCollapsed: boolean
  activeItem: string
  expandedItems: string[]
  itemsRef: React.MutableRefObject<Map<string, HTMLAnchorElement>>
  indicatorStyle: { top: number; height: number }
  onToggleSidebar?: () => void
  onToggleItem: (href: string) => void
  onSetActiveItem: (href: string) => void
  onCloseMobile?: () => void
}

function SidebarContent({
  isCollapsed,
  activeItem,
  expandedItems,
  itemsRef,
  indicatorStyle,
  onToggleSidebar,
  onToggleItem,
  onSetActiveItem,
  onCloseMobile,
}: SidebarContentProps) {
  const handleItemClick = (href: string, hasSubItems: boolean) => {
    if (hasSubItems && !isCollapsed) {
      onToggleItem(href)
    } else {
      onSetActiveItem(href)
      onCloseMobile?.()
    }
  }

  const handleSubItemClick = (href: string) => {
    onSetActiveItem(href)
    onCloseMobile?.()
  }

  return (
    <>
      <div className="inline-flex h-14 items-center justify-between px-4">
        <div
          className={cn(
            "flex items-center gap-2 overflow-hidden transition-all duration-300",
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          <span className="font-audio line-clamp-1 text-lg">SpaceY</span>
        </div>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hover:bg-primary/15 text-muted-foreground hover:text-primary cursor-pointer rounded-lg p-2 transition-colors"
          >
            <PanelLeft
              className={cn(
                "size-5 transition-transform duration-300 ease-in-out",
                isCollapsed && "rotate-180"
              )}
            />
          </button>
        )}
      </div>

      <nav className="relative flex-1 space-y-4 px-2 py-4">
        <div
          className="bg-primary invisible absolute left-0 w-1 rounded-full transition-all duration-200 ease-in-out md:visible"
          style={{
            top: indicatorStyle.top,
            height: indicatorStyle.height,
          }}
        />
        <TooltipProvider>
          {sidebarSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-2">
                  <h2 className="text-muted-foreground text-xs font-semibold">
                    {section.title}
                  </h2>
                </div>
              )}
              {section.items.map((item) => {
                const hasSubItems = item.subItems && item.subItems.length > 0
                const isExpanded = expandedItems.includes(item.href)

                const content = (
                  <div key={item.href}>
                    <a
                      ref={(el) => {
                        if (el) {
                          itemsRef.current.set(item.href, el)
                        } else {
                          itemsRef.current.delete(item.href)
                        }
                      }}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleItemClick(item.href, !!hasSubItems)
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors duration-200 ease-in-out [&_svg]:size-5",
                        activeItem === item.href
                          ? "text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        item.disabled && "pointer-events-none opacity-50"
                      )}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span
                          className={cn(
                            "truncate transition-all duration-300",
                            isCollapsed
                              ? "w-0 opacity-0"
                              : "ml-3 w-auto opacity-100"
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                      {hasSubItems && !isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      )}
                    </a>
                    {hasSubItems && !isCollapsed && isExpanded && (
                      <div className="mt-1 ml-6 space-y-1">
                        {item.subItems?.map((subItem) => (
                          <a
                            key={subItem.href}
                            ref={(el) => {
                              if (el) {
                                itemsRef.current.set(subItem.href, el)
                              } else {
                                itemsRef.current.delete(subItem.href)
                              }
                            }}
                            href={subItem.href}
                            onClick={(e) => {
                              e.preventDefault()
                              handleSubItemClick(subItem.href)
                            }}
                            className={cn(
                              "flex items-center rounded-lg p-2 text-sm font-medium transition-colors duration-200 ease-in-out [&_svg]:size-4",
                              activeItem === subItem.href
                                ? "text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {subItem.icon}
                            <span className="ml-3">{subItem.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.href} delayDuration={0}>
                      <TooltipTrigger asChild>{content}</TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                }

                return content
              })}
            </div>
          ))}
        </TooltipProvider>
      </nav>

      <div className={cn("p-3 py-2")}>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div>
                <ModeToggle size={isCollapsed ? "default" : "expanded"} />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className={!isCollapsed ? "sr-only" : ""}
            >
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

interface SidebarProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("/")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const itemsRef = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [indicatorStyle, setIndicatorStyle] = useState({
    top: 0,
    height: 0,
  })
  const { isMobile, width } = useScreenSize()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleItem = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    )
  }

  useEffect(() => {
    const activeElement = itemsRef.current.get(activeItem)
    if (!activeElement) return

    setIndicatorStyle({
      top: activeElement.offsetTop,
      height: activeElement.offsetHeight,
    })
  }, [activeItem, isCollapsed, expandedItems])

  const sidebarContent = (
    <SidebarContent
      isCollapsed={isMobile ? false : isCollapsed}
      activeItem={activeItem}
      expandedItems={expandedItems}
      itemsRef={itemsRef}
      indicatorStyle={indicatorStyle}
      onToggleSidebar={isMobile ? undefined : toggleSidebar}
      onToggleItem={toggleItem}
      onSetActiveItem={setActiveItem}
      onCloseMobile={isMobile ? () => onOpenChange?.(false) : undefined}
    />
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetHeader className="sr-only">
          <SheetTitle>SpaceY</SheetTitle>
        </SheetHeader>
        <SheetContent side="left" className="w-60 p-0">
          <div className="bg-muted/60 dark:bg-card relative flex h-full flex-col">
            {sidebarContent}
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "bg-muted/60 dark:bg-card relative flex h-screen flex-col border-r transition-all duration-350 ease-in-out",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      {sidebarContent}
    </div>
  )
}

export function SidebarTrigger() {
  return <Menu className="size-5" />
}
