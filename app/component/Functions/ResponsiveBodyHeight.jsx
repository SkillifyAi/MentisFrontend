import { useEffect } from 'react';

function useResponsiveBodyHeight() {
  useEffect(() => {
    const updateBodyHeight = () => {
      if (document.documentElement.scrollHeight > window.innerHeight) {
        document.body.style.height = 'auto';
      } else {
        document.body.style.height = '100vh';
      }
    };

    updateBodyHeight();

    window.addEventListener('resize', updateBodyHeight);

    const observer = new MutationObserver(updateBodyHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', updateBodyHeight);
      observer.disconnect();
    };
  }, []);
}

export default useResponsiveBodyHeight