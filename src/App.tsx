import type { JSX } from 'react';
import ScreenplayEditor from './components/editor/ScreenplayEditor';

export default function App(): JSX.Element {
  return (
    <div className="App">
      <ScreenplayEditor />
    </div>
  );
}
