import { useSource } from "@providers/source";
import { Image } from "../components/Image";

export const Instagram = () => {
  const { get } = useSource();
  console.log({
    instagram: get('app.data.instagram')
  });
  return <div className="lg:max-w-5xl mx-auto lg:px-12">
    <div className="flex flex-col items-center text-center">
      <div className="text-2xl font-sweetsans">
        {get('app.data.instagram.title', 'INSTAGRAM')}
      </div>
      <div className="w-40 h-14 relative">
        <Image {...get('app.data.instagram.image', {
          src: '/home/icons/web-homepage-icons-04.png'
        })} objectFit="contain"></Image>
      </div>
      <div className='h-12'></div>
      <div className="flex flex-wrap w-full justify-center">
        {get('app.data.instagram', []).map((item, i) => {
          const src = item.image;
          if (!src)
            return null;
          return <div key={i} className="flex-1 w-1/3 lg:w-32 p-px lg:p-3">
            <div className="w-full relative bg-element-4">
              <div style={{ paddingTop: '100%' }}></div>
              <Image variant="card" src={item.image || '/logo.png'}></Image>
            </div>
          </div>;
        })}
      </div>
    </div>
  </div>;
};