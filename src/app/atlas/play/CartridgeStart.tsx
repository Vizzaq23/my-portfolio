'use client';

import { useEffect, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

export default function CartridgeStart({ frame }: { frame: RefObject<HTMLIFrameElement | null> }) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const link = host?.querySelector('a');
    if (!link) return;
    // Native listeners in the owning document avoid cross-iframe PointerEvent
    // identity checks in gesture recognizers. Motion still drives the spring.
    const enter = (event: PointerEvent) => { if (event.pointerType !== 'touch') setHovered(true); };
    const leave = () => { setHovered(false); setPressed(false); };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    link.addEventListener('pointerenter', enter);
    link.addEventListener('pointerleave', leave);
    link.addEventListener('pointerdown', down);
    link.ownerDocument.addEventListener('pointerup', up);
    link.ownerDocument.addEventListener('pointercancel', up);
    return () => {
      link.removeEventListener('pointerenter', enter);
      link.removeEventListener('pointerleave', leave);
      link.removeEventListener('pointerdown', down);
      link.ownerDocument.removeEventListener('pointerup', up);
      link.ownerDocument.removeEventListener('pointercancel', up);
    };
  }, [host]);
  useEffect(() => {
    let restore: (() => void) | undefined;
    const mount = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== 'scene-ready') return;
      restore?.();
      const document = frame.current?.contentDocument?.querySelector('iframe')?.contentDocument;
      const original = document?.querySelector<HTMLAnchorElement>('.start');
      if (!document || !original) return;
      const target = document.createElement('span');
      target.dataset.reactStart = 'true';
      original.replaceWith(target);
      setHost(target);
      restore = () => { target.replaceWith(original); };
    };
    window.addEventListener('message', mount);
    return () => { window.removeEventListener('message', mount); restore?.(); };
  }, [frame]);
  if (!host) return null;
  return createPortal(<motion.a
    className="start" href="/#top" target="_top" data-spring-start="true"
    style={{ transition: 'color 140ms, background 140ms', transformOrigin: '50% 50%' }}
    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    animate={{ scale: reduced ? 1 : pressed ? .95 : hovered ? 1.045 : focused ? 1.015 : 1, y: reduced ? 0 : pressed ? 1 : hovered ? -2 : 0 }}
    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 24, mass: .65 }}
  ><span aria-hidden="true">◆</span> START</motion.a>, host);
}
