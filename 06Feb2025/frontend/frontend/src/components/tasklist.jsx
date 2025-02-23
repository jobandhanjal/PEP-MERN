import { useEffect, useState } from "react";
import "./tasklist.css"; //ES6
// require("./taskList.css") // CJS

// re-render === re-run the function
const tasklist = () => {
    // let list = []; // react does not track the normal variables
    const [list, setList] = useState([]);

    const getData = async () => {
        const resp = await fetch("http://localhost:1401/tasks");
        const respBody = await resp.json();
        // list = respBody.data.tasks;
        const arrayOfTaskList = respBody.data.tasks;
        setList(arrayOfTaskList);
    };

    // getData(); // if you call the function directly, it will happen infinite times
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="task-list-main">
            <h3 className="task-list-title">Task List</h3>
            <div className="task-list-task-container">
                {list.map((elem) => {
                    return (
                        <div>
                            <p>{elem.workTitle}</p>
                            <p>{elem.taskTitle}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default tasklist;