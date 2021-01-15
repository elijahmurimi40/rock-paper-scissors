import { RefObject } from 'react';

export type NavProps = {
  children: {
    nav: RefObject<HTMLDivElement> | null;
  }
}

export type ContainerProps = {
  children: {
    container: RefObject<HTMLDivElement> | null;
    cHeight: number;
  }
}
