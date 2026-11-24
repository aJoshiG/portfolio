import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../data/models';
import { Icon } from '../icon/icon';

/** A project in one of two layouts: `featured` (large, with screenshot) or compact. */
@Component({
  selector: 'app-project-card',
  imports: [Icon],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
