import Hero from '../components/Hero';
import About from '../components/About';
import Work from '../components/Work';
import Dossiers from '../components/Dossiers';
import Timeline from '../components/Timeline';
import Stack from '../components/Stack';
import Credentials from '../components/Credentials';
import Contact from '../components/Contact';

export default function Home({ started, reduced }) {
  return (
    <>
      <Hero started={started} reduced={reduced} />
      <About reduced={reduced} />
      <Work reduced={reduced} />
      <Dossiers reduced={reduced} />
      <Timeline reduced={reduced} />
      <Stack reduced={reduced} />
      <Credentials reduced={reduced} />
      <Contact reduced={reduced} />
    </>
  );
}
