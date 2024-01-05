type Props = {
  classNames?: string;
}

export const ChevronDown = ({ classNames }: Props) => 
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-chevron-down ${classNames ?? ''}`}>
  <polyline points="6 9 12 15 18 9"></polyline>
</svg>