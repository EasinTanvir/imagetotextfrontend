import axios from "axios";

const onImageHandlers = async (image, setImageToTextLoader) => {
  if (image === undefined) {
    console.log("select an image");
  }
  if (image.type === "image/jpg" || "image/jpeg" || "image/png") {
    setImageToTextLoader(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "image-upload");
    formData.append("upload_name", "dujpd4jfd");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dujpd4jfd/image/upload",
        formData
      );
      const myUrl = data.url.toString();

      return myUrl;
    } catch (err) {
      console.log(err);
      setImageToTextLoader(false);
    }
  } else {
    console.log("please select an jpg image");
  }
};

export default onImageHandlers;
