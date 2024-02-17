import { FunctionComponent } from "react";
import Button from "../../components/Button";

const Dashboard = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <div className="mb-8 text-lg font-bold">User's Dashboard</div>
      <Button
        type="button"
        btnText="Logout"
        onClick={() => {
          localStorage.removeItem("token");
        }}
      />
    </div>
  );
};

export default Dashboard as FunctionComponent;
