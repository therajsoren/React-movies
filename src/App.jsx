const Card = ({ title }) => {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h2>Functional Arrow Component</h2>
      <Card title="Stars Wars" />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
  );
};

export default App;