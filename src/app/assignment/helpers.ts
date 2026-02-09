import { Assignment, DynamicSection, DynamicSectionItem } from './types';

export function createSectionItem(): DynamicSectionItem {
  return { value: 0 };
}

export function createSection(): DynamicSection {
  return {
    name: '',
    items: [createSectionItem()],
  };
}

export function createAssignment(): Assignment {
  return {
    sections: [createSection()],
  };
}
