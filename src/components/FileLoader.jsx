import { BallTriangle, MagnifyingGlass } from "react-loader-spinner";
function FileLoader({ text }) {
  return (
    <div
      style={{ height: "77vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <span>
        <span>
          {text ? (
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          ) : (
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          )}
        </span>
        <span className="mt-5">
          {text ? "Preparing File" : "Message Loading...."}{" "}
        </span>
      </span>
    </div>
  );
}

export default FileLoader;
