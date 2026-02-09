import { Routes } from '@angular/router';
import { DynamicSectionFormPage } from './pages/dynamic-section-form-page/dynamic-section-form-page';
import { AssignmentRoot } from './pages/assignment-root/assignment-root';
import { DynamicSectionViewPage } from './pages/dynamic-section-view-page/dynamic-section-view-page';

export default [
  {
    path: '',
    component: AssignmentRoot,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },

      { path: 'view', component: DynamicSectionViewPage },
      { path: 'form', component: DynamicSectionFormPage },
    ],
  },
] as Routes;
