const YTvideos = ({ exercise }) => {
  return (
    <div>
      <iframe
        width="360"
        height="300"
        src={exercise.vid}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YTvideos;
