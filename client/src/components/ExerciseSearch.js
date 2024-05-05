import { useEffect, useState } from "react";
import YTvideos from "./YTvideos";

const ExerciseSearch = () => {
  const [data, setData] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/exercise/${filterVal}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setSearchApiData(json);
        });
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filterResult);
    }
    setFilterVal(e.target.value);
  };

  return (
    <div>
      <div className="exercise-search">
        <input
          placeholder="Search Exercise"
          value={filterVal}
          onInput={(e) => handleFilter(e)}
          name="exercise-input"
        />
      </div>
      <div className="exercise-cards">
        {data.map((item) => {
          return (
            <div className="card" key={item._id}>
              <div>
                {" "}
                <YTvideos exercise={item} />{" "}
              </div>
              <h3> {item.name} </h3>
              <p> {item.desc} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseSearch;
