import { useRef } from "react";
import { Camera } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import AxiosInstance from "../lib/AxiosInstence";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface CameraUploadButtonProps {
  userID: number;
}

const CameraUploadButton = ({ userID }: CameraUploadButtonProps) => {
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async () => {
    try {
      const file = fileInputRef.current?.files?.[0];
      if(file){
        const date = new Date();
        const uniqueFileName = `user-${date.getTime()}-${Math.floor(Math.random() * 1000)}.${file.name.split('.').pop()}`;
        const storageRef = ref(storage, `uploads/user-profiles/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              toast({
                title: "Uploading Image",
                description: `Upload is ${progress}% done`,
                variant: "info",
              });
              break;
          }
        },
        (error) => {
          console.log(error);
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            AxiosInstance.post("/Customer/update-image", {
              Id: userID,
              Url: downloadURL.toString(),
            }).then(() => {
              toast({
                title: "Success",
                description: "Your profile image has been updated",
                variant: "success",
              });
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
              toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive",
              });
            });
          });
        });
      }
    
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    }
  };
  

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="absolute bottom-0 right-0 bg-primary-500 p-2 rounded-full text-white hover:bg-primary-600 transition-colors"
      >
        <Camera className="h-5 w-5" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CameraUploadButton;
