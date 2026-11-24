import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { NAV_ITEMS } from '../../data/navigation';
import { PROFILE } from '../../data/profile';
import { ScrollSpyService } from '../../services/scroll-spy.service';
import { SectionHeader } from '../../shared/section-header/section-header';

/**
 * The single scrolling page. In step 3 each placeholder section becomes its own
 * component (hero, about, skills, experience, projects, achievements, contact).
 */
@Component({
  selector: 'app-home',
  imports: [SectionHeader],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly profile = PROFILE;
  protected readonly sections = NAV_ITEMS;

  constructor() {
    const spy = inject(ScrollSpyService);
    afterNextRender(() => spy.observe(NAV_ITEMS.map((item) => item.id)));
  }
}
