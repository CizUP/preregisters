import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={50}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          cizup.dev
        </Text>
      </Title>
      <Text
        inherit
        className={classes.description}
        gradient={{ from: 'pink', to: 'yellow' }}
        ta="center"
        size="lg"
      >
        We have completed our registrations. Thanks for your interest!
      </Text>
    </>
  );
}
