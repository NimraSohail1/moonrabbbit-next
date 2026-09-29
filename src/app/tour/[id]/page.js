import TourDetail from '@/components/TourDetail';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Tour Circuit - Moon Rabbit`,
  };
}

export default async function TourParamPage({ params }) {
  const { id } = await params;
  return <TourDetail explicitId={id} />;
}
