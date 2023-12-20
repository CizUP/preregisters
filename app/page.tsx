import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import PreRegisterForm from '@/components/Form/Form';

export default function HomePage() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '0',
        right: '0',
        margin: 'auto',
        WebkitTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
      }}
    >
      <Welcome />
      {/**<ColorSchemeToggle /> */}
      {/**<PreRegisterForm /> */}
    </div>
  );
}
