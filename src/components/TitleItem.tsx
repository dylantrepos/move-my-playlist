import { PropsWithChildren } from "react";
import './styles/Title.scss';

type Props = {
  classNames?: string;
}

export const TitleItem = ({
  classNames,
  children
}: PropsWithChildren<Props>) => {
  return (
    <h1 className={`title ${classNames ?? ''}`}>
      { children }
    </h1>
  )
}
