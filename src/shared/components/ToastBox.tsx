'use client';
import { useEffect } from 'react';
import { useToastStore } from '@/shared/store/toastStore';
import { ToastBar } from './ToastBar';

export const ToastBox = () => {
  const { list, remove, respond, tick } = useToastStore();

  // Nuxt의 setInterval tick() 로직과 동일
  useEffect(() => {
    const timer = setInterval(tick, 500);
    return () => clearInterval(timer);
  }, []);

  if (list.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
      {list.map((item) => (
        <ToastBar
          key={item.id}
          item={item}
          onClose={() => remove(item.id)}
          onRespond={(value) => respond(item.id, value)}
        />
      ))}
    </div>
  );
};
