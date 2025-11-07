// src/icons/LogoRotate/LogoRotate.tsx
import { SVGProps } from "react";

export default function LogoRotate(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 256 256'
      width='1em'
      height='1em'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M152 70.059 201.539 20.519 235.48 54.461 185.941 104H256v48h-70.059L235.48 201.539 201.539 235.48 152 185.941V256h-48v-70.059L54.46 235.48 20.52 201.539 70.059 152H0v-48h70.059L20.519 54.46 54.461 20.52 104 70.059V0h48v70.059Z' />
    </svg>
  );
}
