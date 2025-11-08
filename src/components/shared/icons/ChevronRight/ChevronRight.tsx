// src/icons/ChevronRight/ChevronRight.tsx
import { SVGProps } from "react";

export default function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      width='1em'
      height='1em'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-chevron-right-icon'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='m9 18 6-6-6-6' />
    </svg>
  );
}
