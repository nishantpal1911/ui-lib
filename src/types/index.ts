import React from 'react';

interface TextWithoutChildren {
  text: string;
  children?: never;
}

interface ChildrenWithoutText {
  text?: never;
  children: React.ReactNode;
}

export type TextOrChildren = TextWithoutChildren | ChildrenWithoutText;
export * from 'src/types/toast';
