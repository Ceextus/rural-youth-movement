import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

const NewsCard = forwardRef(function NewsCard(
  { image, alt, tag, date, title, excerpt, href = "/news" },
  ref
) {
  return (
    <article
      ref={ref}
      className="bg-surface border border-outline-variant/30 rounded-xl flex flex-col group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />

      <Link href={href} className="flex flex-col flex-1 relative z-10">
        <div className="h-48 overflow-hidden rounded-t-xl relative">
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex gap-2 mb-3">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-label-md text-label-md group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {tag}
            </span>
            <span className="text-on-surface-variant font-label-md text-label-md">
              {date}
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {excerpt}
          </p>
          <span className="text-primary font-label-md text-label-md flex items-center gap-1 mt-auto group/btn">
            Read Story
            <span className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-5 absolute">
                arrow_forward
              </span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-300 -translate-x-5 group-hover:translate-x-0 absolute">
                arrow_forward
              </span>
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
});

export default NewsCard;
