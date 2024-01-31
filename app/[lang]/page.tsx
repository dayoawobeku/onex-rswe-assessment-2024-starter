import Details from '@/components/details';
import Main from '@/components/main';
import Nav from '@/components/nav';
import {Locale} from '@/i18n.config';
import {getDictionary} from '@/lib/dictionary';

export default async function Home({params: {lang}}: {params: {lang: Locale}}) {
  const {main, details, navigation} = await getDictionary(lang);
  return (
    <>
      <Nav navigation={navigation} />
      <Main main={main} />
      <Details details={details} />
    </>
  );
}
