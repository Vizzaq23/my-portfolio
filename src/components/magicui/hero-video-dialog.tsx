"use client"

// Magic UI (MIT), adapted from the downloaded registry snapshot in vendor/ui/.
// Extensions: Radix modal semantics, custom media slot, reduced motion, retro theme.
import { useState, type ReactNode } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { Play, XIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
  title?: string
  description?: string
  children?: ReactNode
  onOpenChange?: (open: boolean) => void
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  title = "Project demo",
  description = "Video demonstration",
  children,
  onOpenChange,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const selectedAnimation = animationVariants[reducedMotion ? "fade" : animationStyle]
  const setOpen = (open: boolean) => { setIsVideoOpen(open); onOpenChange?.(open) }

  return (
    <div className={cn("relative", className)}>
      <Dialog.Root open={isVideoOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
      <button
        type="button"
        aria-label={`Watch ${title}: ${description}`}
        className="hero-video-trigger group relative w-full cursor-pointer border-0 bg-transparent p-0"
      >
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          sizes="(max-width: 1279px) 90vw, 380px"
          className="aspect-video w-full rounded-2xl border border-slate-300 bg-slate-950 object-contain shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
          <div className="flex size-24 items-center justify-center rounded-full bg-amber-300/20 backdrop-blur-md">
            <div
              className="relative flex size-16 scale-100 items-center justify-center rounded-full border-2 border-amber-100 bg-gradient-to-b from-amber-300 to-amber-500 shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
            >
              <Play
                className="size-7 scale-100 fill-slate-950 text-slate-950 transition-transform duration-200 ease-out group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {isVideoOpen && (
          <Dialog.Portal forceMount>
          <Dialog.Overlay asChild>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md"
          />
          </Dialog.Overlay>
          <Dialog.Content asChild aria-modal="true">
            <motion.div
              {...selectedAnimation}
              initial={reducedMotion ? false : selectedAnimation.initial}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", damping: 30, stiffness: 300 }}
              className="demo-dialog fixed inset-0 z-[101] h-fit"
            >
              <div className="demo-dialog-heading">
                <div><p className="demo-eyebrow">Project screening</p><Dialog.Title>{title}</Dialog.Title></div>
                <Dialog.Close asChild><motion.button type="button" className="demo-close" aria-label="Close demo">Close <XIcon className="size-5" /></motion.button></Dialog.Close>
              </div>
              <Dialog.Description className="demo-description">{description}</Dialog.Description>
              {children ?? <div className="demo-dialog-screen">
                <iframe
                  src={videoSrc}
                  title={title}
                  className="mt-0 size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>}
            </motion.div>
          </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
      </Dialog.Root>
    </div>
  )
}
