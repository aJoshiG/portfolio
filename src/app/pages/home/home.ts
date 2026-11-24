import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { EXPERIENCE } from '../../data/experience';
import { NAV_ITEMS } from '../../data/navigation';
import { Achievements } from '../../sections/achievements/achievements';
import { About } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Experience } from '../../sections/experience/experience';
import { Hero } from '../../sections/hero/hero';
import { Projects } from '../../sections/projects/projects';
import { Skills } from '../../sections/skills/skills';
import { ScrollSpyService } from '../../services/scroll-spy.service';

/** The single scrolling page. Section order here matches NAV_ITEMS. */
@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills, Experience, Projects, Achievements, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-skills />
    @if (hasExperience) {
      <app-experience />
    }
    <app-projects />
    <app-achievements />
    <app-contact />
  `,
})
export class HomePage {
  protected readonly hasExperience = EXPERIENCE.length > 0;

  constructor() {
    const spy = inject(ScrollSpyService);
    afterNextRender(() => spy.observe(NAV_ITEMS.map((item) => item.id)));
  }
}
