import React, {useState, useEffect} from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import './App.css'
function App() {
  const [reminderMessage, setReminderMessage] = useState("");

  const [phoneNumber, setphoneNumber] = useState("");

  const [remindeTime, setRemindTime] = useState("");

  const [remindersList, setRemindersList] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3002/getAllReminders").then(res =>{
      setRemindersList(res.data)
    })
  }, [])

  const addReminder = ()=>{
    axios
      .post("http://localhost:3002/addNewReminder", {
        // sending two objects in body of request.
        phoneNumber,
        reminderMessage,
        remindeTime,
      })
      .then((res) => {
        console.log(res);
        setRemindersList(res.data);
      });
      setReminderMessage("");
      setRemindTime("");
      setphoneNumber("");
  }

  const deleteReminder = (id)=>{
   axios
     .post("http://localhost:3002/deleteReminder", {
       id
     })
     .then((res) => {
      //  console.log(res);
       setRemindersList(res.data);
     });
  }

  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage-header">
          <div className="left">
            {/* {
  // const [toggleDivState, setToggleDivState] = useState(true);
import ToggleDiv from "./components/ToggleDiv";

               onClick={()=> setToggleDivState(!toggleDivState)}
              (toggleDivState) ? <ToggleDiv/> : ("All Reminders")
            } */}
          </div>
          <div className="right">
            <ul className="listitem">
              <li className="listitems">Settings</li>
              <li className="listitems">Feedback</li>
              <li className="listitems">Contact Me</li>
              <li className="listitems">Code</li>
            </ul>
          </div>
        </div>
        <div className="homepage_main">
          <h1>Notify Yourself</h1>
          <input
            type="text"
            placeholder="Whatsapp-Number"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add Reminder Note"
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
          />

          {/* pass the date object in order to make sure the time which is selected is not of past instead it must of future. */}
          <DateTimePicker
            value={remindeTime}
            onChange={setRemindTime}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />
          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>

        <div className="homepage_mainContent">
          {remindersList.map((singleReminder) => (
            <div className="reminder_card" key={singleReminder._id}>
              <h2>Note:{`${singleReminder.reminderMessage}`} </h2>
              <h3>
                Time:
                {String(
                  new Date(
                    singleReminder.remindeTime.toLocaleString(undefined, {
                      timezone: "Asia/Kolkata",
                    })
                  )
                )}
              </h3>
              <p>{String(singleReminder.phoneNumber)}</p>
              <div
                className="button"
                onClick={() => deleteReminder(singleReminder._id)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;



// installed axios and react datetimepicker