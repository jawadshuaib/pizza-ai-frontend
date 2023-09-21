import React from 'react';
import Loader from '../../ui/Loader';
import { fetchAndUploadImage } from '../../services/supabase/upload-image';
import { useDispatch } from 'react-redux';
import { setError } from '../../slices/errorSlice';
// import { useSelector } from 'react-redux';
export default function Order() {
  const [image] = React.useState('');
  const dispatch = useDispatch();
  // const AIImage = useSelector((store) => store.pizza.AIImage);

  React.useEffect(() => {
    const tmp = `https://oaidalleapiprodscus.blob.core.windows.net/private/org-fjrJOPSACALV6hQYyDaufQ2g/user-LZMlgSZCBAhrIkOmf8ooTgu9/img-v7gw7scEnsP52w7C6HQCnjqn.png?st=2023-09-20T18%3A27%3A45Z&se=2023-09-20T20%3A27%3A45Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-20T00%3A01%3A52Z&ske=2023-09-21T00%3A01%3A52Z&sks=b&skv=2021-08-06&sig=lfw81meeL3VovFjy49QKjKt1DlNgg/2g7LJCB2kg4Es%3D`;
    fetchAndUploadImage(tmp)
      .then((data) => {
        console.log(data.path);
        dispatch(setError([false]));
      })
      .catch(() => {
        dispatch(setError([true, 'Error uploading the image.']));
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
