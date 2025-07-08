import { useMouseFollower } from "./use-mouse-follower";

export const App = () => {
  useMouseFollower();

  return (
    <div>app</div>
    // <div style={{ height: "100vh", padding: "20px" }}>
    //   <h1>Simple Mouse Follower</h1>
    //   <p>Just import the hook and call it - that's it!</p>
    //   <p>The blue cube will follow your mouse automatically.</p>
    // </div>
  );
};
