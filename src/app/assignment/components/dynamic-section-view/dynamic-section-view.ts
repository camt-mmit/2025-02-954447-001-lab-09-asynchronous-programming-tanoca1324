import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Assignment, DynamicSectionItem } from '../../types';

@Component({
  selector: 'app-dynamic-section-view',
  imports: [DecimalPipe],
  templateUrl: './dynamic-section-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionView {
  readonly data = input.required<Assignment>();

  protected calculateTotal(items: readonly DynamicSectionItem[]): number {
    return items.reduce((sum, item) => sum + item.value, 0);
  }
}
