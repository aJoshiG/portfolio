import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/profile';

/**
 * The single scrolling page. In step 3 each block below becomes its own
 * section component (hero, about, skills, experience, projects, achievements, contact).
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly profile = PROFILE;
}
