import { Layout } from './shared/components/Layout';
import { Tabs } from './shared/components/Tabs';

export const App = () => {
  return (
    <div className="app">
      <Layout sidebar={<div>sidebar</div>} content={<Tabs />} />
    </div>
  );
};
