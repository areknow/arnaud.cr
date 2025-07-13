import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Tabs } from './components/Tabs';

export const App = () => (
  <div className="app">
    <Layout sidebar={<Sidebar />} content={<Tabs />} />
  </div>
);
