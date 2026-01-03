// import { useEffect } from "react";

// export function useOutsideClick(ref, handler) {
//   useEffect(() => {
//     function listener(event) {
//       // Do nothing if clicking ref's element or its children
//       if (!ref.current || ref.current.contains(event.target)) {
//         return;
//       }

//       handler(event);
//     }

//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);

//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// }

import { useEffect } from "react";

export const useOutsideClick = (refs, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideClick = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target);
      });

      if (isOutsideClick) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler]);
};
