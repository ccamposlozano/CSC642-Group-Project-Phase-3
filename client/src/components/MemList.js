import { Link } from "react-router-dom";

const MemList = (props) => {
  const members = props.members;
  return (
    <div className="memberContainer">
      {members.map((member) => (
        <div className="member-preview" key={member.id}>
          <h2> {member.fullname} </h2>
          <p> {member.role} </p>
          <p>Email: {member.email} </p>
          <p>GitHub: {member.git} </p>
          <p>
            <Link to={member.about}>Click me to learn more!</Link>
          </p>
          <img src={member.pic} alt="not found"></img>
        </div>
      ))}
    </div>
  );
};

export default MemList;
