export interface DynamicSectionItem {
  readonly value: number;
}

export interface DynamicSection {
  readonly name: string;
  readonly items: readonly DynamicSectionItem[];
}

export interface Assignment {
  readonly sections: readonly DynamicSection[];
}
