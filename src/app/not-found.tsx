import type { Metadata } from 'next';

import { COPY } from '@/shared/config';
import { UIContainer, UILinkButton } from '@/shared/ui';

/** 404 не должна попадать в индекс — иначе поисковик хранит «мусорные» URL. */
export const metadata: Metadata = {
  title: COPY.notFound.title,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <UIContainer>
      <div className="flex min-h-[80svh] flex-col items-start justify-center pb-20 pt-32">
        <p className="font-serif text-hero leading-none text-brand-emphasis lining-nums">
          {COPY.notFound.code}
        </p>
        <h1 className="mt-6 font-serif text-title font-normal text-foreground">
          {COPY.notFound.title}
        </h1>
        <p className="mt-4 max-w-md text-body text-muted-foreground">
          {COPY.notFound.description}
        </p>
        <UILinkButton
          href="/"
          size="lg"
          className="mt-10 text-eyebrow uppercase"
          dataName="not-found-home"
        >
          {COPY.notFound.home}
        </UILinkButton>
      </div>
    </UIContainer>
  );
}
