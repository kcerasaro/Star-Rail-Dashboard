import './Widget.css';
import { ReactNode } from 'react';

type WidgetProps = {
  title?: string;
  children?: ReactNode;
};

function Widget({ title, children }: WidgetProps) {
  return (
    <div className="widget">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export default Widget;
