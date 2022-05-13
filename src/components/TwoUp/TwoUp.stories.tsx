import { TwoUp, TwoUpProps } from '.';
import { Img } from '../Img';

export default {
  title: 'Components/TwoUp',
  component: TwoUp
};

export const Default = (props: TwoUpProps) => (
  <TwoUp
    left={
      <>
        <Img src="https://assets.imgix.net/unsplash/turntable.jpg" />
        <span>An image</span>
      </>
    }
    right={
      <>
        <p>
          Sagittis et eget egestas nullam adipiscing sapien dis pharetra ut
          rutrum quisque proin, tellus dolor nec ligula habitasse feugiat nostra
          hac maecenas vivamus ante, non semper inceptos dignissim vehicula
          velit senectus porta elementum praesent nulla. Erat turpis scelerisque
          quam aliquet eros tristique praesent proin eu, egestas ultricies
          suspendisse nisl litora ultrices integer himenaeos, penatibus diam
          augue ante platea fermentum venenatis volutpat. Imperdiet curabitur
          bibendum ac pellentesque risus blandit vehicula hendrerit nam nibh
          accumsan, cras molestie enim habitant felis ligula posuere nascetur
          magnis rhoncus ut mi, platea aptent convallis sem dapibus libero
          malesuada interdum natoque pharetra. Nec morbi elit commodo cras
          fringilla, ut at litora pharetra, turpis sagittis placerat non. Non
          mollis rhoncus tempus per sodales velit euismod sociosqu, nisi lacinia
          feugiat eros vehicula suspendisse nascetur montes, conubia pulvinar
          parturient pretium purus mus cursus. Tortor nam pellentesque hac
          posuere ligula proin quis sit, venenatis taciti suspendisse aptent
          risus scelerisque platea, dictumst elementum nostra facilisi primis
          massa eu.
        </p>
        <p>
          Ipsum proin interdum nulla a porta cursus molestie, torquent montes
          risus leo eleifend nascetur conubia, orci sed tristique semper netus
          integer. Praesent euismod tincidunt neque aptent dolor vitae
          facilisis, justo molestie lacinia magna bibendum lectus, dis aliquet
          interdum dictum sapien ligula.
        </p>
      </>
    }
  />
);
