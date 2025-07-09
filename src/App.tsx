import { Layout } from './shared/components/Layout';

export const App = () => {
  return (
    <div className="app">
      <Layout sidebar={<div>sidebar</div>} content={<div>content</div>} />
    </div>
  );
};
