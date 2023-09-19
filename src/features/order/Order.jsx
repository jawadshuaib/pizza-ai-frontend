import React from 'react';
import Loader from '../../ui/Loader';
import { fetchAndUploadImage } from '../../services/upload-image-to-supabase';
// import { useSelector } from 'react-redux';
export default function Order() {
  const [image] = React.useState('');
  // const AIImage = useSelector((store) => store.pizza.AIImage);

  React.useEffect(() => {
    const tmp = `https://oaidalleapiprodscus.blob.core.windows.net/private/org-fjrJOPSACALV6hQYyDaufQ2g/user-LZMlgSZCBAhrIkOmf8ooTgu9/img-k0HL1pVEVKL0A7JtVCDYFojk.png?st=2023-09-19T17%3A28%3A15Z&se=2023-09-19T19%3A28%3A15Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-19T16%3A52%3A39Z&ske=2023-09-20T16%3A52%3A39Z&sks=b&skv=2021-08-06&sig=BbzroTUbrapo7q5scbkJGIZiuh0n7B%2B%2BVa5KPhAe9vs%3D`;
    fetchAndUploadImage(tmp)
      .then((data) => {
        console.log(data);
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
