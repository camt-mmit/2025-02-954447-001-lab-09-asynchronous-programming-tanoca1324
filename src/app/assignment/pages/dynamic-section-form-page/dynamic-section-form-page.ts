import { ChangeDetectionStrategy, Component, effect, inject, resource } from '@angular/core';
import { DynamicSectionForm } from '../../components/dynamic-section-form/dynamic-section-form';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';
import { createAssignment } from '../../helpers';

@Component({
  selector: 'app-dynamic-section-form-page',
  imports: [DynamicSectionForm],
  template: `
    @if (dataResource.hasValue()) {
      <app-dynamic-section-form [(data)]="dataResource.value" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionFormPage {
  private readonly storage = inject(DynamicSectionDataStorage);
  protected readonly dataResource = resource({
    loader: async () => (await this.storage.get()) ?? createAssignment(),
  });

  constructor() {
    effect(() => {
      if (this.dataResource.hasValue()) {
        this.storage.set(this.dataResource.value()!);
      }
    });
  }
}
