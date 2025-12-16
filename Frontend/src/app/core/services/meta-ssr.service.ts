// src/app/core/services/meta-ssr.service.ts
import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable()
export class MetaSsrService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly platformId = inject(PLATFORM_ID);

  update(
    titleText: string,
    description: string,
    image = 'https://dobrodii.onrender.com/assets/images/background1.png',
    url = 'https://dobrodii.onrender.com'
  ) {
    if (!isPlatformServer(this.platformId)) return;

    this.title.setTitle(titleText);

    const tags: MetaDefinition[] = [
      // BASIC SEO
      { name: 'description', content: description },

      // OPEN GRAPH
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Добродій' },
      { property: 'og:title', content: titleText },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },

      // TWITTER
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: titleText },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    tags.forEach(tag => this.meta.updateTag(tag));
  }
}
