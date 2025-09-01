import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-8 sm:mb-12 md:mb-16 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-20 sm:h-24 md:h-28 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <TooltipProvider>
        <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-2 sm:px-3 md:px-4 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-w-fit w-auto max-w-full rounded-2xl sm:rounded-3xl transition-all duration-300 hover:scale-105">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10 sm:size-12 md:size-14 flex-shrink-0 transition-all duration-200 hover:scale-110 active:scale-95"
                    )}
                  >
                    <item.icon className="size-4 sm:size-5 md:size-6" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-8 sm:h-10 md:h-12 flex-shrink-0 mx-1" />
          {Object.entries(DATA.contact.social)
            .filter(([, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-10 sm:size-12 md:size-14 flex-shrink-0 transition-all duration-200 hover:scale-110 active:scale-95"
                      )}
                    >
                      <social.icon className="size-4 sm:size-5 md:size-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <Separator orientation="vertical" className="h-8 sm:h-10 md:h-12 py-2 flex-shrink-0 mx-1" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <AnimatedThemeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
