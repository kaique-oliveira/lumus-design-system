import { Container } from './styles';
import { Calendar } from '@lumus-ui/react';

export function Home() {
  return (
    <Container>
      <Calendar onDateSelected={() => {}} />
    </Container>
  );
}
