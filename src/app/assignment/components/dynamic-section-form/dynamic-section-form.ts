import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { DecimalPipe } from '@angular/common';
import { Assignment, DynamicSection, DynamicSectionItem } from '../../types';
import { createSectionItem } from '../../helpers';

@Component({
  selector: 'app-dynamic-section-form',
  imports: [FormField, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  readonly data = model.required<Assignment>();
  protected readonly form = form(this.data);

  protected addSection(): void {
    this.form.sections().value.update((s: readonly DynamicSection[]) => [
      ...s,
      {
        // กำหนดชื่อให้รันเลขตามลำดับ array ล่าสุด
        name: (s.length + 1).toString(),
        items: [createSectionItem()],
      },
    ]);
  }

  protected removeSection(index: number): void {
    this.form.sections().value.update((s: readonly DynamicSection[]) =>
      s.filter((_, i) => i !== index).map((section, i) => ({
        ...section,
        name: (i + 1).toString() // รีรันเลขใหม่เมื่อมีการลบ
      }))
    );
  }

  protected addItem(sectionIdx: number): void {
    // แก้ Error 'at' โดยเข้าถึง index ตรงๆ
    this.form.sections[sectionIdx].items().value.update((items: readonly DynamicSectionItem[]) =>
      [...items, createSectionItem()]
    );
  }

  protected removeItem(sectionIdx: number, itemIdx: number): void {
    this.form.sections[sectionIdx].items().value.update((items: readonly DynamicSectionItem[]) =>
      items.filter((_, idx) => idx !== itemIdx)
    );
  }

  protected calculateTotal(sectionIdx: number): number {
    const items = this.form.sections[sectionIdx].items().value();
    return items.reduce((sum: number, item: DynamicSectionItem) =>
      sum + (Number(item.value) || 0), 0
    );
  }
}
