import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../../utils/cn";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 text-white text-sm rounded-md disabled:opacity-50 disabled:pointer-events-none transition-colors duration-200 ease-in-outtransition-colors duration-200 ease-in-out",

  variants: {
    size: {
      default: "px-4 py-3 bg-blue-base hover:bg-blue-dark",
      small: "px-1.5 py-2 bg-gray-200 text-gray-600 font-semibold gap-1.5 border border-gray-200 hover:border-blue-base",
      icon: "p-2 bg-gray-200 border border-gray-200 hover:border-blue-base",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ size }), className)} {...props}>
      {children}
    </button>
  );
}
