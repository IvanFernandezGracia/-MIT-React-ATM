const ATMDeposit = ({ onChange, isDeposit, isValid, error }) => {
  const choice = ["Deposit", "Cash Back"];
  // console.log(`ATM isDeposit: ${isDeposit} + ${isValid}`);

  return (
    <label className="label huge">
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        width="200"
        value={choice[Number(!isDeposit)] + " Now"}
        id="submit-input"
        disabled={isValid ? false : true}
      ></input>
      {!isValid && (
        <div>{error}</div>
      )}
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [error, setError] = React.useState("");

  let status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    if (Number(event.target.value) > 0) {
      setValidTransaction(true);
      setDeposit(Number(event.target.value));
      if (atmMode === "Cash Back") {
        Number(event.target.value) > totalState
          ? setValidTransaction(false)
          : setValidTransaction(true);
          Number(event.target.value) > totalState
          ? setError("ERROR: Amount insert exceeds the maximum")
          : setError("");
      }
    } else {
      setValidTransaction(false);
      setError("ERROR: Insert number is 0, negative or invalid")
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Entre Submit");
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.target[1].value = 0;
    setDeposit(0);
  };

  const handleModeSelect = (event) => {
    event.preventDefault();
    setAtmMode(event.target.value);
    if (event.target.value != "") {
      if (event.target.value === "Deposit") {
        setIsDeposit(true);
        setValidTransaction(true);
      } else {
        setIsDeposit(false);
        setValidTransaction(false);
      }
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value="">
          Choose option
        </option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>
      {atmMode !== "" && (
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}
          error={error}
        ></ATMDeposit>
      )}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
