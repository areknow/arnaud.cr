import { Layout } from './shared/components/Layout';
import { Sidebar } from './shared/components/Sidebar';
import { Tabs } from './shared/components/Tabs';

export const App = () => {
  return (
    <div className="app">
      <Layout sidebar={<Sidebar />} content={<Tabs />} />
    </div>
  );
};
