import { createFileRoute } from '@tanstack/react-router';

// Main page
const AboutUs = () => {
  return (
    <div className="p-2">
      <h1>Home page | About us</h1>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: AboutUs,
});
