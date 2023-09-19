import React from 'react';
import Loader from '../../ui/Loader';
import { fetchAndUploadImage } from '../../services/upload-image-to-supabase';
// import { useSelector } from 'react-redux';
export default function Order() {
  const [image] = React.useState('');
  // const AIImage = useSelector((store) => store.pizza.AIImage);

  React.useEffect(() => {
    const cors = 'https://cors-anywhere.herokuapp.com/';
    // const cors = 'https://glacial-brushlands-90091.herokuapp.com/';
    const tmp = `${cors}https://oaidalleapiprodscus.blob.core.windows.net/private/org-fjrJOPSACALV6hQYyDaufQ2g/user-LZMlgSZCBAhrIkOmf8ooTgu9/img-xTcp8ZyKpdw7a6Gn9C7AslBV.png?st=2023-09-18T22%3A00%3A27Z&se=2023-09-19T00%3A00%3A27Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-18T21%3A43%3A18Z&ske=2023-09-19T21%3A43%3A18Z&sks=b&skv=2021-08-06&sig=CaNkPa1XkOmB8Nd6UkaO3ORMMLhEsco9wJkJijlczxQ%3D`;
    fetchAndUploadImage(tmp)
      .then((dt) => {
        console.log(dt);
      })
      .catch((error) => {
        console.error('Error uploading the image:', error);
      });

    // uploadImageToSupabase({ file: tmp }).then((data) => {
    //   console.log(`Uploaded ${data}`);
    // });

    // The following works
    // getImageFromSupabase().then((img) => {
    //   console.log(`Downloaded ${img}`);
    //   setImage(img);
    // });
  }, []);

  return (
    <>
      <Loader reason="Ordering a pizza for you..." />
      {image !== null && <img src={image} />}
    </>
  );
}
