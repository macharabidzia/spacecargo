import { DataTable } from "@/components/common/DataTable";
import columns from "@/lib/table/parcels.columns";
import React from "react";

const Parcels = () => {
  const data = [
    {
      id: "p1",
      mobileNumber: "849020991",
      declaredAmount: "415",
      description: "ტვირთის ზომა. 30კგ",
      courier: "33",
    },
    {
      id: "p2",
      mobileNumber: "849020992",
      declaredAmount: "416",
      description: "ტვირთის ზომა. 20კგ",
      courier: "34",
    },
    {
      id: "p3",
      mobileNumber: "849020993",
      declaredAmount: "417",
      description: "ტვირთის ზომა. 40კგ",
      courier: "35",
    },
    {
      id: "p4",
      mobileNumber: "849020994",
      declaredAmount: "418",
      description: "ტვირთის ზომა. 10კგ",
      courier: "36",
    },
    {
      id: "p5",
      mobileNumber: "849020995",
      declaredAmount: "419",
      description: "ტვირთის ზომა. 50კგ",
      courier: "37",
    },
    {
      id: "p6",
      mobileNumber: "849020996",
      declaredAmount: "420",
      description: "ტვირთის ზომა. 25კგ",
      courier: "38",
    },
    {
      id: "p7",
      mobileNumber: "849020997",
      declaredAmount: "421",
      description: "ტვირთის ზომა. 35კგ",
      courier: "39",
    },
    {
      id: "p8",
      mobileNumber: "849020998",
      declaredAmount: "422",
      description: "ტვირთის ზომა. 15კგ",
      courier: "40",
    },
    {
      id: "p9",
      mobileNumber: "849020999",
      declaredAmount: "423",
      description: "ტვირთის ზომა. 45კგ",
      courier: "41",
    },
    {
      id: "p10",
      mobileNumber: "849021000",
      declaredAmount: "424",
      description: "ტვირთის ზომა. 5კგ",
      courier: "42",
    },
    {
      id: "p11",
      mobileNumber: "849021001",
      declaredAmount: "425",
      description: "ტვირთის ზომა. 55კგ",
      courier: "43",
    },
    {
      id: "p12",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
    {
      id: "p13",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
    {
      id: "p14",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
    {
      id: "p15",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
  ];

  return (
    <div className="container">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Parcels;
