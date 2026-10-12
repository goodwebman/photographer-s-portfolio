import type { FC } from 'react';

import { COPY, SOCIALS } from '@/shared/config';
import { UIIconLink } from '@/shared/ui';

/** Иконки соцсетей в подвале. Server component. */
export const FooterSocials: FC = () => (
  <ul aria-label={COPY.footer.socials} className="flex gap-2">
    {SOCIALS.map((social) => (
      <li key={social.id}>
        <UIIconLink
          href={social.href}
          label={`${social.label} ${social.handle}`}
          variant="outline"
          className="rounded-full bg-transparent"
          dataName={social.id}
        >
          <span className="text-[1.05rem]">{social.icon}</span>
        </UIIconLink>
      </li>
    ))}
  </ul>
);
