import Transaction from "./Components/Transaction";
import "./App.css";
import FormComponent from "./Components/FormComponent";
import { useState, useEffect } from "react";
import DataContext from "./Data/DataContext";
import ReportComponent from "./Components/ReportComponent";
import { BrowserRouter as Router ,Switch, Route, Link } from "react-router-dom";

function App() {
  const initData = [
    { id: 1, title: "เงินเดือน", amount: 50000 },
    { id: 2, title: "ที่พักอาศัย", amount: -6000 },
  ];
  const [items, setItems] = useState(initData);

  const [repoortIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    setItems((prevItems) => {
      return [newItem, ...prevItems];
    });
  };

  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0);
    const expense =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1;
    console.log(income);
    console.log(expense);

    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items, repoortIncome, reportExpense]);

  return (
    <DataContext.Provider
      value={{
        income: repoortIncome,
        expense: reportExpense,
      }}
    >
      <div className="container">
        <h1>โปรแกรมบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" exact>
                <ReportComponent />
              </Route>
              <Route path="/insert">
                <FormComponent onAddItem={onAddNewItem} />
                <Transaction items={items} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
