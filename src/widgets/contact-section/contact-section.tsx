import type { FC } from 'react';

import Image from 'next/image';

import { getPhoto } from '@/entities/photo';
import { COPY, SECTION_ID, SITE, SOCIALS } from '@/shared/config';
import { UIContainer, UILinkButton, UIReveal, UISection, UITextLink } from '@/shared/ui';
import { TelegramIcon } from '@/shared/ui/icons';

/** «Приглашающий» кадр: взгляд через плечо. */
const CONTACT_PHOTO = getPhoto('night-bridge-03');

const TITLE_ID = 'contact-title';

/**
 * Контакты (реф. 2): «Жду вас в кадре» крупным serif, главный CTA — Telegram,
 * ниже каналы связи и город; справа кадр. Формы нет — запись только по
 * ссылкам (решение заказчика). У Instagram — сноска про Meta. Server component.
 */
export const ContactSection: FC = () => (
  <UISection id={SECTION_ID.contact} ariaLabelledby={TITLE_ID} dataName="contact">
    <UIContainer className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
      <UIReveal className="flex flex-col lg:col-span-7">
        <p className="flex items-center gap-3 text-eyebrow uppercase text-muted-foreground">
          <span className="font-serif text-small normal-case tracking-normal text-brand-emphasis lining-nums">
            04
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          {COPY.contact.eyebrow}
        </p>

        <h2 id={TITLE_ID} className="mt-5 font-serif text-display font-normal text-foreground">
          {COPY.contact.titleStart}{' '}
          <em className="whitespace-nowrap italic text-brand-emphasis">{COPY.contact.titleAccent}</em>
        </h2>
        <p className="mt-6 max-w-md text-body text-muted-foreground sm:text-[1.0625rem]">
          {COPY.contact.text}
        </p>

        <div className="mt-10">
          <UILinkButton
            href={SITE.telegram}
            size="lg"
            className="h-14 gap-3 px-7 text-eyebrow uppercase max-sm:w-full"
            dataName="contact-telegram"
          >
            <TelegramIcon className="size-4" />
            {COPY.contact.telegram}
          </UILinkButton>
        </div>

        <dl className="mt-14 grid gap-6 border-t border-border pt-8 sm:grid-cols-3 lg:mt-auto">
          {SOCIALS.map((social) => (
            <div key={social.id} className="flex flex-col gap-2">
              <dt className="text-eyebrow uppercase text-muted-foreground">{social.label}</dt>
              <dd>
                <UITextLink
                  href={social.href}
                  tone="muted"
                  className="text-body text-foreground hover:text-brand-emphasis"
                  dataName={`contact-${social.id}`}
                >
                  {social.handle}
                </UITextLink>
              </dd>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <dt className="text-eyebrow uppercase text-muted-foreground">{COPY.contact.cityLabel}</dt>
            <dd className="text-body text-foreground">{COPY.contact.city}</dd>
          </div>
        </dl>
        <p className="mt-6 text-caption text-muted-foreground">{COPY.common.metaDisclaimer}</p>
      </UIReveal>

      <UIReveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
        <div className="relative aspect-4/5 overflow-hidden bg-muted max-lg:max-w-md lg:h-full lg:aspect-auto lg:min-h-[36rem]">
          <Image
            src={CONTACT_PHOTO.src}
            alt={CONTACT_PHOTO.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1460px) 430px, (min-width: 1024px) 31vw, (min-width: 480px) 448px, 100vw"
            className="object-cover"
            style={{ objectPosition: CONTACT_PHOTO.focal }}
          />
        </div>
      </UIReveal>
    </UIContainer>
  </UISection>
);
