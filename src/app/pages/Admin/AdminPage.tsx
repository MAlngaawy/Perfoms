import { useEffect, useState, lazy, Suspense } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";

type Props = {};

const Teams = lazy(() => import("~/@main/components/ManagerComponents/Teams"));
const Sports = lazy(
  () => import("~/@main/components/ManagerComponents/Sports")
);
const Users = lazy(() => import("~/@main/components/ManagerComponents/Users"));

const AdminPage = (props: Props) => {
  const [checked, setChecked] = useState<"Teams" | "Sports" | "Users">(
    //@ts-ignore
    localStorage.getItem("checked") || "Teams"
  );

  useEffect(() => {
    localStorage.setItem("checked", checked);
  }, [checked]);

  return (
    <div className="mx-6">
      <div className="flex gap-2 xs:gap-4  p-2 sm:p-6 sm:pb-0">
        <AppRadioGroub
          values={["Teams", "Sports", "Users"]}
          checked={checked}
          setChecked={setChecked}
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {checked === "Teams" && <Teams />}
        {checked === "Sports" && <Sports />}
        {checked === "Users" && (
          <div>
            <h1>
              <Users />
            </h1>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default AdminPage;
